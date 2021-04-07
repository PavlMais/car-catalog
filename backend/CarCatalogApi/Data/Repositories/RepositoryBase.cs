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
        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await Context.ToListAsync();
        }
        
        public async Task<T> GetByIdAsync(long id)
        {
            return await Context.FindAsync(id);
        }
        public void Add(T entity)
        {
            Context.Add(entity);
        }
        public void Update(T entity)
        {
            Context.Update(entity);
        }
        public void Delete(T entity)
        {
            Context.Remove(entity);
        }
        public void DeleteById(long id)
        {
            Delete(GetByIdAsync(id).Result);
        }

        public async Task<bool> AnyByIdAsync(int id)
        {
            return await Context.AnyAsync(e => e.Id == id);
        }

        public async Task SaveAsync()
        {
            await _onSave.Invoke(new CancellationToken());
        }
    }
}