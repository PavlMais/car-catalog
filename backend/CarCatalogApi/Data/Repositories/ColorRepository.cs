using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Repositories
{
   
    public interface IColorRepository : IRepositoryBase<Color>
    {
    
    }

    public class ColorRepository : RepositoryBase<Color>, IColorRepository
    {
        public ColorRepository(EfContext context) :base(context)
        {
        }
    }

}