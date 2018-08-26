using News.BusinessLayer.Services;
using News.Web.DTO;
using News.Web.Forms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace News.Web.Controllers
{
  class GoogleUser
  {
    public string email { get; set; }
  }

  [Authorize]
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    UserService _userService;

    public AuthController(UserService userService)
    {
      _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("[action]")]
    public async Task<IActionResult> SignIn([FromBody] SignInForm form)
    {
      try
      {
        using (var client = new HttpClient())
        {
          var response = await client.GetAsync($"https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={form.GoogleToken}");
          var content = await response.Content.ReadAsStringAsync();
          var googleUser = JsonConvert.DeserializeObject<GoogleUser>(content);
          var user = await _userService.SignInAsync(googleUser.email);
          var tokenHandler = new JwtSecurityTokenHandler();
          var key = Encoding.ASCII.GetBytes("SymmetricSecurityKey");
          var tokenDescriptor = new SecurityTokenDescriptor
          {
            Subject = new ClaimsIdentity(new Claim[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
          };
          var token = tokenHandler.CreateToken(tokenDescriptor);
          var tokenString = tokenHandler.WriteToken(token);

          return Ok(new UserDto
          {
            Id = user.Id,
            Email = user.Email,
            Token = tokenString
          });
        }
      }
      catch (Exception e)
      {
        throw;
      }
    }
  }
}
