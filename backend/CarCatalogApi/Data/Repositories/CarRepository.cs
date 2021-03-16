using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Repositories
{
    public interface ICarRepository : IRepositoryBase<Car>
    {
        
    }

    public class CarRepository : RepositoryBase<Car>, ICarRepository
    {
        public CarRepository(EfContext context) :base(context)
        {
        }
    }
}