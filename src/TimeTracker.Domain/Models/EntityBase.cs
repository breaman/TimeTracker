using TimeTracker.Domain.Abstract;

namespace TimeTracker.Domain.Models
{
    public class EntityBase : IEntity
    {
        public int Id { get; set; }
    }
}