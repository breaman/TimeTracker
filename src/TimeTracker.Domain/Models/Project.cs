namespace TimeTracker.Domain.Models
{
    public class Project : EntityBase
    {
        public string Title { get; set; }
        public Client Client { get; set; }
        public int ClientId { get; set; }
    }
}