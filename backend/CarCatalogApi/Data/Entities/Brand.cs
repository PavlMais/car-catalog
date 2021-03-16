using System.Collections.Generic;

namespace Car_catalog.Data.Entities
{
    public class Brand : BaseEntity
    {
        public string Name { get; set; }

        public virtual ICollection<Model> Models { get; set; }
        public virtual ICollection<Car> Cars { get; set; }
    }
}