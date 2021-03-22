using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Car_catalog.Models
{
    public class NewCarModel
    {
        public string Description { get; set; }
        public double EngineVolume { get; set; }
        public long BrandId { get; set; }
        public long ModelId { get; set; }
        public long ColorId { get; set; }
        public decimal Price { get; set; }
    }
}