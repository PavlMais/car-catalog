using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;
using Car_catalog.Models;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data.Repositories
{
    public interface ICarRepository : IRepositoryBase<Car>
    {
        public IQueryable<Car> GetAll(CarFilters carFilters);
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

        public IQueryable<Car> GetAll(CarFilters carFilters)
        {
            // var r = GetAll().Join(
            //     Context.Prices, car => car.Id, price => price.CarId, 
            //     (car, price) => new
            //     {
            //         Price = price.Value,
            //         Date = price.CreatedAt,
            //         CarId = car.Id
            //     }).Where(v => v.Date < carFilters.PriceDate).OrderBy().Take(1);              
            //
            //
            // return GetAll().Where(
            //     car =>
            //     {
            //         var price = car.Prices.Where(p => p.CreatedAt < carFilters.PriceDate)
            //             .OrderBy(p => p.CreatedAt).First().Value;
            //         
            //         if (price > carFilters.PriceFrom && price < carFilters.PriceTo) return false;
            //
            //         return (car.ColorId == carFilters.ColorId && (int)car.EngineVolume == carFilters.EngineValume);
            //         
            //         return car.Prices.Where(p => p.CreatedAt < carFilters.PriceDate)
            //             .OrderBy(p => p.CreatedAt).First().Value;
            //     });
            
            
            return GetAll().Where(
                car => car.Prices.Last().Value > carFilters.PriceFrom &&
                       car.Prices.Last().Value < carFilters.PriceTo &&
                       car.ColorId == carFilters.ColorId
            );
        }

        public new IQueryable<Car> GetAll()
        {
            return Context.Cars
                .Include(c => c.Prices)
                .Include(c => c.Model)
                .Include(c => c.Brand)
                .Include(c => c.Color);
        }
    }
}