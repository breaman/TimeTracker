using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TimeTracker.Domain.Abstract;
using TimeTracker.Domain.Models;

namespace TimeTracker.Web.Controllers.Api
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        public IProjectRepository ProjectRepository { get; }
        public ProjectController(IProjectRepository projectRepository)
        {
            ProjectRepository = projectRepository;
        }

        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return ProjectRepository.AllIncluding(p => p.Client);
        }
    }
}