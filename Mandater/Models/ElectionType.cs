using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class ElectionType
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string InternationalName { get; set; }
        [Required]
        public virtual Country Country { get; set; }
        [Required]
        public virtual List<Election> Elections { get; set; }
    }
}