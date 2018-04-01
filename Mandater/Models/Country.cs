using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public class Country
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CountryId { get; set; }
        public string InternationalName { get; set; }
        [Required]
        public string CountryCode { get; set; }

        [Required]
        public List<ElectionType> ElectionTypes { get; set; }
        
    }
}
