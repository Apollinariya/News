using News.DataLayer;
using News.DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace News.BusinessLayer.Services
{
  public class NewsService
  {
    NewsContext _context;

    public NewsService(NewsContext context)
    {
      _context = context;
    }

    public async Task<int> AddNews(string text, int userId)
    {
      var news = _context.News.Add(new New
      {
        Text = text,
        UserId = userId
      });

      await _context.SaveChangesAsync();

      return news.Entity.Id;
    }
  }
}
