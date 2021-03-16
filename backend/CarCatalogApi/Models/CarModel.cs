using System.Collections.Generic;

namespace Car_catalog.Models
{
    public class CarModel
    {
        public string Description { get; set; }
        public double EngineVolume { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public List<double> Prices { get; set; }
    }
}