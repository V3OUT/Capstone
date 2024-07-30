using api.Data;
using api.DTOS;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;
public class UserService
{
    private readonly PrimeAutomobilesDbContext _context;

    public UserService(PrimeAutomobilesDbContext context)
    {
        _context = context;
    }

    // Convert User model to UserDTO
    public UserDTO ToDTO(User user)
    {
        return new UserDTO
        {
            UserId = user.UserId,
            Username = user.Username,
            Role = user.Role
        };
    }

    // Convert UserCreateDto to User model
    public User ToModel(UserCreateDto dto)
    {
        return new User
        {
            Username = dto.Username,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password), // Hash password
            Role = dto.Role
        };
    }

    // Find user by Username (string)
    public async Task<User> FindByUsernameAsync(string username)
    {
        return await _context.Users
                             .FirstOrDefaultAsync(u => u.Username == username);
    }

    // Create a new user
    public async Task CreateUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }
}
