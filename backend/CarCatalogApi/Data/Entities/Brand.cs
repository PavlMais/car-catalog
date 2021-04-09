using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Car_catalog.Data.Entities
{
    public class Brand : BaseEntity
    {
        public string Name { get; set; }

        public virtual ICollection<Model> Models { get; set; }

        [NotMapped]
        public bool HasModels { get; set; }
    }
}