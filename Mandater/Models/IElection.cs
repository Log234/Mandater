using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Data;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Mandater.Models
{
    public interface IElection
    {
        int ElectionId { get; set; }
        [Required]
        int Year { get; set; }
        [Required]
        ElectionType ElectionType { get; set; }
        [Required]
        List<Result> Results { get; set; }
    }
}
