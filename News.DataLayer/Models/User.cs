using System.Collections.Generic;

namespace News.DataLayer.Models
{
  public class User
  {
    public int Id { get; set; }

    public string Email { get; set; }

    public List<New> News { get; set; }
  }
}
