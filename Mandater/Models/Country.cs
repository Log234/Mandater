using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public class Country: IComparable<Country>
    {
        [Key]
        public string InternationalName { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string ShortName { get; set; }
        [Required]
        public virtual List<ElectionType> ElectionTypes { get; set; }

        public int CompareTo(Country other)
        {
            return String.Compare(InternationalName, other.InternationalName, StringComparison.Ordinal);
        }
    }
}
