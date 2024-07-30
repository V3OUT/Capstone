
using System.Collections.Generic;
using api.models;

namespace api.models;


public class User
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;// Consider using ASP.NET Identity for user management
    public string Role { get; set; } = string.Empty;
}
