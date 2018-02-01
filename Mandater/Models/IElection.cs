using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Data;

namespace Mandater.Models
{
    public interface IElection
    {
        [Key]
        int Year { get; }
        ElectionType ElectionType { get; }
    }
}
