using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public class Result: IResult
    {
        public int ResultID { get; set; }
        [Required]
        public Election Election { get; set; }
        [Required]
        public Party Party { get; set; }
        [Required]
        public int Votes { get; set; }
        
    }
}
