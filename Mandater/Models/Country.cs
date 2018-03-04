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
        [Key]
        public string InternationalName { get; set; }

        public virtual List<ElectionType> ElectionTypes { get; set; }
        public virtual List<County> Counties { get; set; }
        public virtual List<Party> Parties { get; set; }
        
    }
}
