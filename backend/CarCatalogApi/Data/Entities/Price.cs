namespace Car_catalog.Data.Entities
{
    public class Price : BaseEntity
    {
        public double Value { get; set; }
     
        public long CarId { get; set; }
        
        public virtual Car Car { get; set; }
    }
}