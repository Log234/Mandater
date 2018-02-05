using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class County
    {
        [Required]
        public int Name { get; set; }
        [Required]
        public virtual Country Country { get; set; }
    }
}