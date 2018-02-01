using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    interface ICountry
    {
        [Key]
        string Name { get; }
        string ShortName { get; }
    }
}
