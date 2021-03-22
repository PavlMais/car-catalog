using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Car_catalog.Models
{
    public class CarFilters
    {
        public decimal PriceFrom { get; set; }
        public decimal PriceTo { get; set; }
        public DateTime PriceDate { get; set; }
        public int  EngineValume { get; set; }
        public int ColorId { get; set; }
    }
}