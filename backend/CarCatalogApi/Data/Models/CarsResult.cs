using System.Collections.Generic;
using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Models
{
    public class CarsResult
    {
        public IEnumerable<Car> Items { get; set; }
        public int TotalCount { get; set; }
    }
}