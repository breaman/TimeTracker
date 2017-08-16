using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace TimeTracker.Web.ViewModels
{
    public class LogoutViewModel
    {
        [BindNever]
        public string RequestId { get; set; }
    }
}