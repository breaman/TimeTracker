using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TimeTracker.Domain.Models;

namespace TimeTracker.Domain.Concrete
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, int>
    {
        public DbSet<TimesheetEntry> TimesheetEntries { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Project> Projects { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }
    }
}