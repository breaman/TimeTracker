using TimeTracker.Domain.Abstract;
using TimeTracker.Domain.Models;

namespace TimeTracker.Domain.Concrete
{
    public class ProjectRepository : RepositoryBase<Project>, IProjectRepository
    {
        public ProjectRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}