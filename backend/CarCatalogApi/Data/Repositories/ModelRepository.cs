using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Repositories
{
    public interface IModelRepository : IRepositoryBase<Model>
    {
    }

    public class ModelRepository : RepositoryBase<Model>, IModelRepository
    {
        public ModelRepository(EfContext context) :base(context)
        {
        }
    }
}