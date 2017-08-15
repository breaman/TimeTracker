using Microsoft.AspNetCore.Identity;
using TimeTracker.Domain.Abstract;

namespace TimeTracker.Domain.Models
{
    public class Role : IdentityRole<int>, IEntity
    {
    }
}