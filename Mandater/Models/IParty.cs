using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public interface IParty
    {
        // The name in the primary language of the party
        [Key]
        string Name { get; }

        // E.g. Arbeiderpartiet -> Ap, Høyre -> H
        string ShortName { get; }
    }
}
