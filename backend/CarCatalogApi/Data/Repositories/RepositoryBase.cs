using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Car_catalog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Car_catalog.Data.Repositories
{
    
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : BaseEntity
    {
        protected DbSet<T> Context { get; set; }
        private Func<CancellationToken, Task<int>> _onSave;
        protected RepositoryBase(DbSet<T> context, Func<CancellationToken, Task<int>> onSave)
        {
            Context = context;
            _onSave = onSave;
        }
        public async Task<IEnumerable<T>> GetAll()
        {
            return await Context.ToListAsync();
        }
        
        public async Task<T> GetById(long id)
        {
            return await Context.FindAsync(id);
        }
        public void Add(T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            entity.CreatedAt = DateTime.Now;
            Context.Add(entity);
        }
        public void Update(T entity)
        {
            entity.UpdatedAt = DateTime.Now;
            Context.Update(entity);
        }
        public void Delete(T entity)
        {
            Context.Remove(entity);
        }
        public void DeleteById(long id)
        {
            Delete(GetById(id).Result);
        }

        public async Task<bool> AnyById(int id)
        {
            return await Context.AnyAsync(e => e.Id == id);
        }

        public async Task Save()
        {
            await _onSave.Invoke(new CancellationToken());
        }
    }
}