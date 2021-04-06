using System.Linq;
using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Repositories
{
    public interface IPriceRepository : IRepositoryBase<Price>
    {
    }
    
    public class PriceRepository : RepositoryBase<Price>, IPriceRepository
    {
        public PriceRepository(EfContext context) :base(context.Prices, context.SaveChangesAsync)
        {
        }
    }
}