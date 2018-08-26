using Microsoft.AspNetCore.Mvc;

namespace News.Web.Controllers
{
  public class HomeController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}
