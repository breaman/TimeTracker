using System;

namespace TimeTracker.Domain.Models
{
    public class TimesheetEntry : EntityBase
    {
        public string Description { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Project Project { get; set; }
        public int ProjectId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}