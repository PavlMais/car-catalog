using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data.Repositories
{
    
    public interface IBrandRepository : IRepositoryBase<Brand>
    {
        
    }

    public class BrandRepository : RepositoryBase<Brand>, IBrandRepository
    {
        public BrandRepository(EfContext context) :base(context.Brands, context.SaveChangesAsync)
        {
        }

        public new async Task<IEnumerable<Brand>> GetAllAsync()
        {
            return await Context.Select(b => new Brand
            {
                Id = b.Id,
                Name = b.Name,
                HasModels = b.Models.Any()
            }).ToListAsync();
        }
    }
}