using System.Threading.Tasks;
using AspNet.Security.OAuth.Validation;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using OpenIddict.Core;
using TimeTracker.Domain.Models;

namespace TimeTracker.Web.Controllers
{
    [Route("api")]
    public class UserinfoController : Controller
    {
        private UserManager<User> UserManager {get;}

        public UserinfoController(UserManager<User> userManager)
        {
            UserManager = userManager;
        }

        //
        // GET: /api/userinfo
        [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
        [HttpGet("userinfo"), Produces("application/json")]
        public async Task<IActionResult> Userinfo()
        {
            var user = await UserManager.GetUserAsync(User);
            if (user == null)
            {
                return BadRequest(new OpenIdConnectResponse
                {
                    Error = OpenIdConnectConstants.Errors.InvalidGrant,
                    ErrorDescription = "The user profile is no longer available."
                });
            }

            var claims = new JObject();

            // Note: the "sub" claim is a mandatory claim and must be included in the JSON response.
            claims[OpenIdConnectConstants.Claims.Subject] = await UserManager.GetUserIdAsync(user);

            if (User.HasClaim(OpenIdConnectConstants.Claims.Scope, OpenIdConnectConstants.Scopes.Email))
            {
                claims[OpenIdConnectConstants.Claims.Email] = await UserManager.GetEmailAsync(user);
                claims[OpenIdConnectConstants.Claims.EmailVerified] = await UserManager.IsEmailConfirmedAsync(user);
            }

            if (User.HasClaim(OpenIdConnectConstants.Claims.Scope, OpenIdConnectConstants.Scopes.Phone))
            {
                claims[OpenIdConnectConstants.Claims.PhoneNumber] = await UserManager.GetPhoneNumberAsync(user);
                claims[OpenIdConnectConstants.Claims.PhoneNumberVerified] = await UserManager.IsPhoneNumberConfirmedAsync(user);
            }

            if (User.HasClaim(OpenIdConnectConstants.Claims.Scope, OpenIddictConstants.Scopes.Roles))
            {
                claims[OpenIddictConstants.Claims.Roles] = JArray.FromObject(await UserManager.GetRolesAsync(user));
            }

            if (User.HasClaim(OpenIdConnectConstants.Claims.Scope, OpenIdConnectConstants.Scopes.Profile))
            {
                claims[OpenIdConnectConstants.Claims.FamilyName] =  user.LastName;
                claims[OpenIdConnectConstants.Claims.GivenName] =  user.FirstName;
            }

            // Note: the complete list of standard claims supported by the OpenID Connect specification
            // can be found here: http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims

            return Json(claims);
        }
    }
}