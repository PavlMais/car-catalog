using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Repositories
{
    public interface IRepositoryBase<T> where T : BaseEntity
    {
        IQueryable<T> GetAll();
        Task<T> GetById(long id);
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteById(long id);
        Task<bool> AnyById(int id);
        Task Save();
    }
}