using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public interface IResult
    {
        IElection Election { get; }
        Party Party { get; }
        int Votes { get; }
    }
}
