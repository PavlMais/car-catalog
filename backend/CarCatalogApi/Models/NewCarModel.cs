using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Car_catalog.Models
{
    public class NewCarModel
    {
        public string Description { get; set; }
        [Required]
        public double EngineVolume { get; set; }
        [Required]
        public int BrandId { get; set; }
        public int ModelId { get; set; }
        public int ColorId { get; set; }
        public double Price { get; set; }
    }
}