using System.Collections.Generic;

namespace Car_catalog.Models
{
    public class CarsResultModel
    {
        public IEnumerable<CarModel> Items { get; set; }
        public int TotalCount { get; set; }
    }
}