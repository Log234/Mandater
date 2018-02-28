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

        public int Votes { get; set; }
        public double Percentage { get; set; }

        public int ElectionId { get; set; } = -1;
        [Required]
        public virtual Election Election { get; set; }
        
        public int PartyId { get; set; } = -1;
        [Required]
        public virtual Party Party { get; set; }

        public int CountyId { get; set; } = -1;
        [Required]
        public virtual County County { get; set; }

        public int CountyDataId { get; set; } = -1;
        [Required]
        public virtual CountyData CountyData { get; set; }

    }
}