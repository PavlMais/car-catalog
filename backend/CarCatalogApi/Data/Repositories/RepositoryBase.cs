using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data.Repositories
{

    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
    {
        protected EfContext Context { get; set; }
        public RepositoryBase(EfContext context)
        {
            Context = context;
        }
        public IQueryable<T> GetAll()
        {
            return Context.Set<T>();
        }
        public async Task<T> GetById(long id)
        {
            return await Context.Set<T>().FindAsync(id);
        }
        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return Context.Set<T>().Where(expression);
        }
        public void Add(T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            entity.CreatedAt = DateTime.Now;
            Context.Set<T>().Add(entity);
        }
        public void Update(T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            Context.Set<T>().Update(entity);
        }
        public void Delete(T entity)
        {
            Context.Set<T>().Remove(entity);
        }
        public void DeleteById(long id)
        {
            Delete(GetById(id).Result);
        }

        public async Task<bool> AnyById(int id)
        {
            return Context.Set<T>().Any(e => e.Id == id);
        }

        public async Task Save()
        {
            await Context.SaveChangesAsync();
        }
    }
}