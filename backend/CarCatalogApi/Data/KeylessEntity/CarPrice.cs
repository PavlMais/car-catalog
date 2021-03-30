using Car_catalog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data.KeylessEntity
{
    [Keyless]
    public class CarPrice
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public double EngineVolume { get; set; }
        public long BrandId { get; set; }
        public long ModelId { get; set; }
        public long ColorId { get; set; }
        
        public Brand Brand { get; set; }
        public Model Model { get; set; }
        public Color Color { get; set; }
        
        public decimal Price { get; set; }
    }
}