using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Party
    {
        [Required]
        public string Name { get; set; }
        public string InternationalName { get; set; }
        public string ShortName { get; set; }
        [Required]
        public virtual Country Country { get; set; }
    }
}