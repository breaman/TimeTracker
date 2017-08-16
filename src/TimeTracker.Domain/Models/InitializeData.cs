using System;
using System.Linq;
using System.Threading;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenIddict.Core;
using OpenIddict.Models;
using TimeTracker.Domain.Concrete;

namespace TimeTracker.Domain.Models
{
    public static class InitializeData
    {
        public static void Initialize(IServiceProvider serviceProvider, ILoggerFactory loggerFactory)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();
            ILogger logger = loggerFactory.CreateLogger("InitializeData");
            context.Database.Migrate();

            if (!context.Roles.Any())
            {
                var roleManager = serviceProvider.GetRequiredService<RoleManager<Role>>();
                var createTask = roleManager.CreateAsync(new Role { Name = "Administrator" });
                createTask.Wait();
                var identityResult = createTask.Result;

                if (!identityResult.Succeeded)
                {
                    foreach (var error in identityResult.Errors)
                    {
                        logger.LogError($"{error.Code}: {error.Description}");
                    }
                }
            }

            if (!context.Users.Any())
            {
                var userManager = serviceProvider.GetService<UserManager<User>>();
                var user = new User { UserName = "admin@timetracker.com", Email = "admin@timetracker.com", FirstName = "Admin", LastName = "User" };
                var createTask = userManager.CreateAsync(user, "P@ssword");

                createTask.Wait();

                var identityResult = createTask.Result;

                if (!identityResult.Succeeded)
                {
                    foreach (var error in identityResult.Errors)
                    {
                        logger.LogError($"{error.Code}: {error.Description}");
                    }
                }
                else
                {
                    var adminTask = userManager.AddToRoleAsync(user, "Administrator");
                    adminTask.Wait();
                    identityResult = adminTask.Result;

                    if (!identityResult.Succeeded)
                    {
                        foreach (var error in identityResult.Errors)
                        {
                            logger.LogError($"{error.Code}: {error.Description}");
                        }
                    }
                }
            }

            if (!context.Clients.Any())
            {
                context.Clients.Add(new Client { Name = "Contoso, Inc" });
                context.Clients.Add(new Client { Name = "Adventureworks" });

                context.SaveChanges();
            }

            if (!context.Projects.Any())
            {
                context.Projects.Add(new Project { Title = "Angular Training", ClientId = context.Clients.SingleOrDefault(client => client.Name == "Contoso, Inc").Id });
                context.Projects.Add(new Project { Title = "Biztalk", ClientId = context.Clients.SingleOrDefault(client => client.Name == "Adventureworks").Id });

                context.SaveChanges();
            }

            var openIddictApplicationManager = serviceProvider.GetRequiredService<OpenIddictApplicationManager<OpenIddictApplication>>();

            var findByClientIdTask = openIddictApplicationManager.FindByClientIdAsync("angular", CancellationToken.None);
            findByClientIdTask.Wait();
            if (findByClientIdTask.Result == null)
            {
                var application = new OpenIddictApplication
                {
                    ClientId = "angular",
                    DisplayName = "Angular client application",
                    LogoutRedirectUri = "http://localhost:5000",
                    RedirectUri = "http://localhost:5000"
                };

                var createTask = openIddictApplicationManager.CreateAsync(application, CancellationToken.None);
                createTask.Wait();
            }
        }
    }
}