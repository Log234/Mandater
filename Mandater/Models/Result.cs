using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Result
    {
        [Required]
        public virtual Election Election { get; set; }
        [Required]
        public virtual Party Party { get; set; }
        [Required]
        public virtual County County { get; set; }
        [Required]
        public int Votes { get; set; }
    }
}