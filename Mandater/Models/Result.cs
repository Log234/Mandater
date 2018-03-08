using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Result
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ResultId { get; set; }

        public int Votes { get; set; } = -1;
        public double Percentage { get; set; } = double.NaN;

        public int ElectionId { get; set; }
        [Required]
        public virtual Election Election { get; set; }
        
        public int PartyId { get; set; }
        [Required]
        public virtual Party Party { get; set; }

        public int CountyId { get; set; }
        [Required]
        public virtual County County { get; set; }

    }
}