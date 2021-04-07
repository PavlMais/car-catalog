using System.Collections;
using System.Collections.Generic;

namespace Car_catalog.Data.Entities
{
    public class Model : BaseEntity
    {
        public string Name { get; set; }
        
        public long BrandId { get; set; }
        
        public virtual Brand Brand { get; set; }
        public virtual ICollection<Car> Cars { get; set; }
        
    }
}