using Microsoft.EntityFrameworkCore;
using News.DataLayer;
using News.DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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

    public async Task<IEnumerable<New>> GetAllNews()
    {
      return await _context.News.ToArrayAsync();
    }

    public async Task<int> AddNews(New news)
    {
      _context.News.Add(news);

      await _context.SaveChangesAsync();

      return news.Id;
    }

    public async Task UpdateNews(New news)
    {
      _context.News.Update(news);
      await _context.SaveChangesAsync();
    }

    public async Task<New> GetUserNews(int id, int userId)
    {
      return await _context.News.FirstOrDefaultAsync(u => u.Id == id && u.UserId == userId);
    }

    public async Task DeleteNews(New news)
    {
      _context.News.Remove(news);
      await _context.SaveChangesAsync();
    }
  }
}
