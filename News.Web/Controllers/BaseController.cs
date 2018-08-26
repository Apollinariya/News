using News.BusinessLayer.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;

namespace News.Web.Controllers
{
  public class BaseController : Controller
  {
    //private readonly UserService _users;

    //protected BaseController(UserService users)
    //{
    //  _users = users;
    //}

    protected int UserId
    {
      get
      {
        var strId = User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.NameIdentifier)?.Value;
        if (int.TryParse(strId, out int id))
        {
          return id;
        }
        return 0;
      }
    }

    //protected async Task<ApplicationUser> GetUser(int id) => await _users.GetUser(id);
  }
}