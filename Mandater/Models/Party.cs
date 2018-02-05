﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Party: IComparable<Party>
    {
        [Required]
        public string Name { get; set; }
        public string InternationalName { get; set; }
        public string ShortName { get; set; }
        [Required]
        public virtual Country Country { get; set; }

        public int CompareTo(Party other)
        {
            int countryComparison = Comparer<Country>.Default.Compare(Country, other.Country); 
            if (countryComparison != 0) return countryComparison;
            return string.Compare(Name, other.Name, StringComparison.Ordinal);
        }
    }
}