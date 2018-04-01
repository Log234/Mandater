using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class County
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CountyId { get; set; }
        [Required]
        public string Name { get; set; }
        public int Seats { get; set; }

        public int CountryId { get; set; }
        public int ElectionId { get; set; }

        [Required]
        public List<Result> Results { get; set; }
        
    }
}