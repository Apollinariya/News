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
using News.DataLayer.Models;

namespace News.Web.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  public class NewsController : BaseController
  {
    NewsService _newsService;

    public NewsController(NewsService newsService)
    {
      _newsService = newsService;
    }

    [HttpGet("[action]")]
    public async Task<IActionResult> GetAllNews()
    {
      var news = await _newsService.GetAllNews();

      return Ok(news);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> AddNews([FromBody] AddNewsForm form)
    {
      var news = new New
      {
        Text = form.Text,
        UserId = UserId
      };
      var id = await _newsService.AddNews(news);

      return Ok(id);
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> UpdateNews([FromBody] UpdateNewsForm form)
    {
      var news = await _newsService.GetUserNews(form.NewsId, UserId);
      if(news == null)
      {
        return BadRequest();
      }

      news.Text = form.Text;
      await _newsService.UpdateNews(news);

      return Ok();
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> DeleteNews([FromBody] DeleteNewsForm form)
    {
      var news = await _newsService.GetUserNews(form.NewsId, UserId);
      if (news == null)
      {
        return BadRequest();
      }

      await _newsService.DeleteNews(news);

      return Ok();
    }
  }
}
