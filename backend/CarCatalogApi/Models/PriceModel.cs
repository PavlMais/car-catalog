using System;

namespace Car_catalog.Models
{
    public class PriceModel
    {
        public long Id { get; set; }

        public double Value { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}