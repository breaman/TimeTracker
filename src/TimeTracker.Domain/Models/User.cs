using System;
using Microsoft.AspNetCore.Identity;
using TimeTracker.Domain.Abstract;

namespace TimeTracker.Domain.Models
{
    public class User : IdentityUser<int>, IEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTimeOffset? MemberSince { get; set; }
    }
}