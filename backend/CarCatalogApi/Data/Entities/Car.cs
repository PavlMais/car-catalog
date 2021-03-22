using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Car_catalog.Data.Entities
{
    public class Car : BaseEntity {

        public string Description { get; set; }
        [Required]
        public double EngineVolume { get; set; }
        
        public long BrandId { get; set; }
        public long ModelId { get; set; }
        public long ColorId { get; set; }

        [JsonIgnore]
        public virtual Brand Brand { get; set; }
        [JsonIgnore]
        public virtual Model Model { get; set; }
        [JsonIgnore]
        public virtual Color Color { get; set; }
        public ICollection<Price> Prices { get; set; }

        public Car()
        {
            Prices = new List<Price>();
        }
    }
}