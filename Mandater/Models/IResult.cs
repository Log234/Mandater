using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public interface IResult
    {
        int ResultID { get; set; }
        [Required]
        Election Election { get; set; }
        [Required]
        Party Party { get; set; }
        [Required]
        int Votes { get; set; }
    }
}
