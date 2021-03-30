using System;
using System.Linq;
using Car_catalog.Data.Entities;
using Microsoft.AspNetCore.Identity;

namespace Car_catalog.Data.Repositories
{
    public interface IPriceRepository : IRepositoryBase<Price>
    {
    }
    
    
    public class PriceRepository : RepositoryBase<Price>, IPriceRepository
    {
        public PriceRepository(EfContext context) :base(context)
        {
            
            
            
        }

        // public IQueryable<> Get()
        // {
        //     var date = new DateTime(0001, 1, 5);
        //     var priceFrom = 1000;
        //     var priceTo = 95000;
        //
        //
        //     return Context.Prices.Where(p => p.CreatedAt > date)
        //         .Where(p => p.Value < priceTo && p.Value > priceFrom).GroupBy(p => p.CarId);
        //
        //
        // }
    }
}