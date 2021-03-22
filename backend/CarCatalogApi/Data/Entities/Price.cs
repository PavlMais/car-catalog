using System.Text.Json.Serialization;

namespace Car_catalog.Data.Entities
{
    public class Price : BaseEntity
    {
        public decimal Value { get; set; }
     
        [JsonIgnore]
        public long CarId { get; set; }
        
        [JsonIgnore]
        public virtual Car Car { get; set; }
    }
}