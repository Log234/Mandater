using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class ElectionType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ElectionTypeId { get; set; }
        
        [Required]
        public string InternationalName { get; set; }

        public int CountryId { get; set; }
        [Required]
        public virtual List<Election> Elections { get; set; }
        
    }
}