using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Election
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ElectionId { get; set; }
        public int Year { get; set; }

        public int CountryId { get; set; }
        [Required]
        public virtual Country Country { get; set; }

        public int ElectionTypeId { get; set; }
        [Required]
        public virtual ElectionType ElectionType { get; set; }

        public virtual List<Result> Results { get; set; }
        
    }
}