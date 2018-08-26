using News.DataLayer.Models;

namespace News.Web.DTO
{
  public class NewsDto
  {
    public int Id { get; set; }

    public string Text { get; set; }

    public UserDto User { get; set; }

    public NewsDto(New news)
    {
      Id = news.Id;
      Text = news.Text;
      User = new UserDto
      {
        Id = news.UserId,
        Email = news.User.Email
      };
    }
  }
}
