using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Election
    {
        [Required]
        public virtual Country Country { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public virtual ElectionType ElectionType { get; set; }
        [Required]
        public virtual List<Result> Results { get; set; }
    }
}