using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public class Party: IParty
    {
        [Key]
        public string Name { get; }
        public string ShortName { get; }
    }
}
