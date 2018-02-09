using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class County: IComparable<County>
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CountyId { get; set; }
        [Required]
        public int Name { get; set; }
        public int CountryId { get; set; }
        public virtual Country Country { get; set; }

        public int CompareTo(County other)
        {
            int countryComparison = Comparer<Country>.Default.Compare(Country, other.Country); 
            if (countryComparison != 0) return countryComparison;
            return Name.CompareTo(other.Name);
        }
    }
}