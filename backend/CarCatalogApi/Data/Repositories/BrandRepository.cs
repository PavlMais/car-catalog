using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Repositories
{
    
    public interface IBrandRepository : IRepositoryBase<Brand>
    {
        
    }

    public class BrandRepository : RepositoryBase<Brand>, IBrandRepository
    {
        public BrandRepository(EfContext context) :base(context)
        {
        }
        
    }
}