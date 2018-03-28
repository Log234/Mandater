using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mandater.Utilities;

namespace Mandater.Models
{
    public class Election
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ElectionId { get; set; }

        [Required]
        public int Year { get; set; } = -1;
        [Required]
        public Algorithm Algorithm { get; set; }
        [Required]
        public double FirstDivisor { get; set; } = double.NaN;
        [Required]
        public double Threshold { get; set; } = double.NaN;
        [Required]
        public int Seats { get; set; } = -1;
        [Required]
        public int LevelingSeats { get; set; } = -1;

        public int CountryId { get; set; }

        public int ElectionTypeId { get; set; }

        public virtual List<Result> Results { get; set; }

        public virtual List<CountyData> CountyData { get; set; }

    }
}