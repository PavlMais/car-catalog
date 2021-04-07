using System.Collections.Generic;

namespace Car_catalog.Models
{
    public class CarModel
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public double EngineVolume { get; set; }
        public ModelModel Model { get; set; }
        public ColorModel Color { get; set; }
 
       
        public List<PriceModel> Prices { get; set; }
        public decimal Price { get; set; }
    }
}