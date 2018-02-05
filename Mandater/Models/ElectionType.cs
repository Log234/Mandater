using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class ElectionType: IComparable<ElectionType>
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string InternationalName { get; set; }
        [Required]
        public virtual Country Country { get; set; }
        [Required]
        public virtual List<Election> Elections { get; set; }

        public int CompareTo(ElectionType other)
        {
            int countryComparison = Comparer<Country>.Default.Compare(Country, other.Country); 
            if (countryComparison != 0) return countryComparison;
            return string.Compare(Name, other.Name, StringComparison.Ordinal);
        }
    }
}