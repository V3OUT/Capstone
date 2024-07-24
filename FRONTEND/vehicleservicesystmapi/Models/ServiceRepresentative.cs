using System.ComponentModel.DataAnnotations;

namespace vehicleservicesystmapi.Models
{
    public class ServiceRepresentative
    {
        [Key]
        public int ServiceRepresentativeID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
