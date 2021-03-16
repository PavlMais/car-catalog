using System;

namespace Car_catalog.Data.Entities
{
    public class BaseEntity
    {
        public long Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}