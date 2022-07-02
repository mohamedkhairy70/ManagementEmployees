using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace A1softechTaskManagementEmployees.Models
{
    public class GUIDRepository<T> : IRepository<T> where T : class
    {
        protected readonly EmployeesDbContext Context;
        DbSet<T> Table { get; set; }

        public GUIDRepository(EmployeesDbContext context)
        {
            Table = context.Set<T>();
            Context = context;
        }
        public async Task Add(T entity) => await Table.AddAsync(entity);

        public async Task Add(IEnumerable<T> entities) => await Table.AddRangeAsync(entities);

        public async Task<IEnumerable<T>> All() => await Table.ToListAsync();

        public void Delete(T entity) => Table.Remove(entity);

        public void Delete(IEnumerable<T> entities) => Table.RemoveRange(entities);

        public async Task<T> GetId(int? Id) => await Table.FindAsync(Id);

        public void Update(T entity) => Table.Update(entity);

        public void Update(IEnumerable<T> entities) => Table.UpdateRange(entities);

        public IQueryable<T> Where(Expression<Func<T, bool>> expression) => Table.Where(expression);
        public bool IsExist(Expression<Func<T, bool>> expression) => Table.Any(expression);
        public async Task<bool> SaveAll()
        {
            return await Context.SaveChangesAsync() > 0;
        }
    }
}
