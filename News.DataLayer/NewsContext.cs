using News.DataLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace News.DataLayer
{
  public class NewsContext : DbContext
  {
    public NewsContext(DbContextOptions<NewsContext> options)
      : base(options)
    { }

    public DbSet<User> Users { get; set; }

    public DbSet<New> News { get; set; }
  }
}
