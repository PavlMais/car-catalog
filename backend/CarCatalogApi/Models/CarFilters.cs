using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Car_catalog.Models
{
    public class CarFilters
    {
        public decimal? PriceFrom { get; set; }
        public decimal? PriceTo { get; set; }
        public DateTime? PriceDate { get; set; }
        public double?  EngineValume { get; set; }
        public long? ColorId { get; set; }
        public int? Limit { get; set; }
        public long? BrandId { get; set; }
        public long? ModelId { get; set; }
    }
}