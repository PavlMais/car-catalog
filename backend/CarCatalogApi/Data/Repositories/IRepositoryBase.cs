using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;

namespace Car_catalog.Data.Repositories
{
    public interface IRepositoryBase<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(long id);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void DeleteById(long id);
        Task<bool> AnyByIdAsync(int id);
        Task SaveAsync();
    }
}