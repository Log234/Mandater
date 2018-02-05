using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public interface IParty
    {
        int PartyId { get; set; }

        // The name in the primary language of the party
        [Required]
        string Name { get; set; }

        // E.g. Arbeiderpartiet -> Ap, Høyre -> H
        string ShortName { get; set; }
    }
}
