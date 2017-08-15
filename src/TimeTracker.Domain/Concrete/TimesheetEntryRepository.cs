using TimeTracker.Domain.Abstract;
using TimeTracker.Domain.Models;

namespace TimeTracker.Domain.Concrete
{
    public class TimesheetEntryRepository : RepositoryBase<TimesheetEntry>, ITimesheetEntryRepository
    {
        public TimesheetEntryRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}