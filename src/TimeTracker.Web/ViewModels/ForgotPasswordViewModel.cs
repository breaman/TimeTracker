using System.ComponentModel.DataAnnotations;

namespace TimeTracker.Web.ViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}