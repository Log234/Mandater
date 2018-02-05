using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Election: IComparable<Election>
    {
        [Required]
        public virtual Country Country { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public virtual ElectionType ElectionType { get; set; }
        [Required]
        public virtual List<Result> Results { get; set; }

        public int CompareTo(Election other)
        {
            int countryComparison = Comparer<Country>.Default.Compare(Country, other.Country);
            if (countryComparison != 0) return countryComparison;
            int electionTypeComparison = Comparer<ElectionType>.Default.Compare(ElectionType, other.ElectionType); 
            if (electionTypeComparison != 0) return electionTypeComparison;
            return Year.CompareTo(other.Year);
        }
    }
}