using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Party
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PartyId { get; set; }

        [Required]
        public string Name { get; set; }
        public string InternationalName { get; set; }
        public string ShortName { get; set; }

        public int CountryId { get; set; }
        [Required]
        public virtual Country Country { get; set; }
        
    }
}