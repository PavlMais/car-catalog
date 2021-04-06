using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data.Repositories
{
    public interface IModelRepository : IRepositoryBase<Model>
    {
        Task<IEnumerable<Model>> GetByBrandId(long brandId);
    }

    public class ModelRepository : RepositoryBase<Model>, IModelRepository
    {
        public ModelRepository(EfContext context) :base(context.Models, context.SaveChangesAsync)
        {
        }

        public async Task<IEnumerable<Model>> GetByBrandId(long id)
        {
            return await Context.Where(b => b.BrandId == id).ToListAsync();
        }
    }
}