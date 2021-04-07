using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;
using Car_catalog.Models;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data.Repositories
{
    public interface ICarRepository : IRepositoryBase<Car>
    {
        public IEnumerable<Car> GetFiltered(CarFilters carFilters);
        public Task<Car> GetFullByIdAsync(long id);
    }

    public class CarRepository : RepositoryBase<Car>, ICarRepository
    {
        public CarRepository(EfContext context) :base(context.Cars, context.SaveChangesAsync)
        {
        }

        public async Task<Car> GetFullByIdAsync(long id)
        {
            return await GetAllWithFullInfo().FirstOrDefaultAsync(c => c.Id == id);
        }

        public IEnumerable<Car> GetFiltered(CarFilters carFilters)
        {
            IQueryable<Car> cars;
            if (!carFilters.PriceFrom.HasValue && !carFilters.PriceTo.HasValue)
                cars = GetAllWithFullInfo();
            else if (carFilters.PriceDate.HasValue)
                cars = GetCarsByPriceDate(carFilters.PriceDate.Value, carFilters.PriceFrom, carFilters.PriceTo);
            else
                cars = GetCarsByPriceCurrent(carFilters.PriceFrom, carFilters.PriceTo);


            cars = cars.Where(car =>
                !carFilters.EngineValume.HasValue || carFilters.EngineValume.Value == car.EngineVolume);
            cars = cars.Where(car => !carFilters.ColorId.HasValue || carFilters.ColorId.Value == car.ColorId);
            cars = cars.Where(car => !carFilters.BrandId.HasValue || carFilters.BrandId.Value == car.Model.BrandId);
            cars = cars.Where(car => !carFilters.ModelId.HasValue || carFilters.ModelId.Value == car.ModelId);
                                    
            
            return carFilters.Limit.HasValue ? cars.Take(carFilters.Limit.Value) : cars;
        }

        private IQueryable<Car> GetCarsByPriceDate(DateTime date, decimal? from, decimal? to)
        {
            return GetAllWithFullInfo()
                .Where(car => car.Prices
                    .Where(price => price.CreatedAt < date)
                    .OrderByDescending(price => price.CreatedAt)
                    .Take(1)
                    .Where(price =>!from.HasValue || price.Value > from.Value)
                    .Any(price =>!to.HasValue || price.Value < to.Value)
                );
        }
        
        private IQueryable<Car> GetCarsByPriceCurrent(decimal? from, decimal? to)
        {
            return GetAllWithFullInfo()
                .Where(car => car.Prices
                    .OrderByDescending(price => price.CreatedAt)
                    .Take(1)
                    .Where(price =>!from.HasValue || price.Value > from.Value)
                    .Any(price =>!to.HasValue || price.Value < to.Value)
                );
        }
        private IQueryable<Car> GetAllWithFullInfo()
        {
            var cars = Context
                .Include(c => c.Color)
                .Include(c => c.Prices)
                .Include(c => c.Model)
                .ThenInclude(c => c.Brand);

            return cars;
        }
    }
}