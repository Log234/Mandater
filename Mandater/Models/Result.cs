using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class Result: IComparable<Result>
    {
        [Required]
        public virtual Election Election { get; set; }
        [Required]
        public virtual Party Party { get; set; }
        [Required]
        public virtual County County { get; set; }
        [Required]
        public int Votes { get; set; }

        public int CompareTo(Result other)
        {
            int electionComparison = Comparer<Election>.Default.Compare(Election, other.Election);
            if (electionComparison != 0) return electionComparison;
            int partyComparison = Comparer<Party>.Default.Compare(Party, other.Party);
            if (partyComparison != 0) return partyComparison;
            return Comparer<County>.Default.Compare(County, other.County);
        }
    }
}