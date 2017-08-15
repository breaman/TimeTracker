using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TimeTracker.Domain.Abstract
{
    public interface IRepository<T> where T : class, IEntity
    {
        IQueryable<T> All { get; }
        IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);
        Task<T> FindAsync(int id);
        void InsertOrUpdate(T entity);
        void Delete(int id);
        Task<int> SaveAsync();
    }
}