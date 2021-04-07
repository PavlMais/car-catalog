using System;
using System.Text.Json.Serialization;

namespace Car_catalog.Data.Entities
{
    public class Price : BaseEntity
    {
        public decimal Value { get; set; }
        
        public DateTime CreatedAt { get; set; }
    }
}