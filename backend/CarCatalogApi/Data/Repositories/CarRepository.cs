using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;
using Car_catalog.Data.KeylessEntity;
using Car_catalog.Models;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PathSegments;

namespace Car_catalog.Data.Repositories
{
    public interface ICarRepository : IRepositoryBase<Car>
    {
        public IEnumerable<Car> GetFiltered(CarFilters carFilters);
    }

    public class CarRepository : RepositoryBase<Car>, ICarRepository
    {
        public CarRepository(EfContext context) :base(context)
        {
        }

        public new async Task<Car> GetById(long id)
        {
            return await Context.Cars
            .Include(c => c.Prices)
            .Include(c => c.Model)
            .Include(c => c.Brand)
            .Include(c => c.Color)
            .FirstOrDefaultAsync(c => c.Id == id);
        }

       

        public IEnumerable<Car> GetFiltered(CarFilters carFilters)
        {
            IQueryable<Car> cars;
            if (!carFilters.PriceFrom.HasValue && !carFilters.PriceTo.HasValue)
                cars = GetAll();
            else if (carFilters.PriceDate.HasValue)
                cars = GetCarsByPriceDate(carFilters.PriceDate.Value, carFilters.PriceFrom, carFilters.PriceTo);
            else
                cars = GetCarsByPriceCurrent(carFilters.PriceFrom, carFilters.PriceTo);


            cars = cars.Where(car =>
                !carFilters.EngineValume.HasValue || carFilters.EngineValume.Value == car.EngineVolume);
            cars = cars.Where(car => !carFilters.ColorId.HasValue || carFilters.ColorId.Value == car.ColorId);
            cars = cars.Where(car => !carFilters.BrandId.HasValue || carFilters.BrandId.Value == car.BrandId);
            cars = cars.Where(car => !carFilters.ModelId.HasValue || carFilters.ModelId.Value == car.ModelId);
                                    
            

            return carFilters.Limit.HasValue ? cars.Take(carFilters.Limit.Value) : cars;
        }

        public IQueryable<Car> GetCarsByPriceDate(DateTime date, decimal? from, decimal? to)
        {
            return GetAll()
                .Where(car => 
                    (!from.HasValue ||
                    Context.Prices
                        .Where(price => price.CarId == car.Id)
                        .Where(price => price.CreatedAt < date)
                        .OrderBy(price => price.CreatedAt)
                        .First().Value > from.Value )
                    && 
                    (!to.HasValue ||
                    Context.Prices
                        .Where(price => price.CarId == car.Id)
                        .Where(price => price.CreatedAt < date)
                        .OrderBy(price => price.CreatedAt)
                        .First().Value < to.Value));            
        }
        public IQueryable<Car> GetCarsByPriceCurrent(decimal? from, decimal? to)
        {
            return GetAll()
                .Where(car => 
                    (!from.HasValue ||
                     Context.Prices
                         .Where(price => price.CarId == car.Id)
                         .OrderBy(price => price.CreatedAt)
                         .First().Value > from.Value )
                    && 
                    (!to.HasValue ||
                     Context.Prices
                         .Where(price => price.CarId == car.Id)
                         .OrderBy(price => price.CreatedAt)
                         .First().Value < to.Value));            
        }

       


       
        public  IQueryable<Car> GetAll()
        {
            return Context.Cars
                .Include(c => c.Model)
                .Include(c => c.Color)
                .Include(c => c.Brand)
                .Include(c => c.Prices);
        }
    }
}