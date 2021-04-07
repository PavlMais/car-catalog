namespace Car_catalog.Models
{
    public class ModelModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public BrandModel Brand { get; set; }
    }
}