using System.ComponentModel.DataAnnotations;


namespace api.DTOS
{
    public class UserCreateDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required, MinLength(8)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = string.Empty;
    }
}
