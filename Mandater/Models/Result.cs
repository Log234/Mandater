using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public class Result
    {
        public IElection Election { get; }
        public Party Party { get; }
        public int Votes { get; }
    }
}
