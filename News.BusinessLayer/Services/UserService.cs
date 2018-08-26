using News.DataLayer;
using News.DataLayer.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace News.BusinessLayer.Services
{
  public class UserService
  {
    NewsContext _context;

    public UserService(NewsContext context)
    {
      _context = context;
    }

    public async Task<User> SignInAsync(string email)
    {
      var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
      if (user == null)
      {
        user = _context.Users.Add(new User
        {
          Email = email
        }).Entity;
        await _context.SaveChangesAsync();
      }

      return user;
    }
  }
}
