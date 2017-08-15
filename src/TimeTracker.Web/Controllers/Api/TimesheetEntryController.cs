using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TimeTracker.Domain.Abstract;
using TimeTracker.Domain.Models;

namespace TimeTracker.Web.Controllers
{
    [Route("api/[controller]")]
    public class TimesheetEntryController : Controller
    {
        public ITimesheetEntryRepository TimesheetRepository { get; }

        public TimesheetEntryController(ITimesheetEntryRepository timesheetRepository)
        {
            TimesheetRepository = timesheetRepository;
        }

        [HttpGet]
        [ResponseCache(NoStore=true)]
        public IEnumerable<TimesheetEntry> Get()
        {
            var timesheetEntries = TimesheetRepository.AllIncluding(t => t.Project, t => t.Project.Client).OrderByDescending(t => t.EndTime);

            return timesheetEntries;
        }

        [HttpPost]
        public async Task<TimesheetEntry> Post([FromBody]TimesheetEntry timesheetEntry)
        {
            timesheetEntry.UserId = 1;
            timesheetEntry.ProjectId = timesheetEntry.Project.Id;
            timesheetEntry.Project = null;

            TimesheetRepository.InsertOrUpdate(timesheetEntry);
            await TimesheetRepository.SaveAsync();

            var updatedEntry = await TimesheetRepository.AllIncluding(t => t.Project, t => t.Project.Client).SingleOrDefaultAsync(t => t.Id == timesheetEntry.Id);

            return updatedEntry;
        }
    }
}