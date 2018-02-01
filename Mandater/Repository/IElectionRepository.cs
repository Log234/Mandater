using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Models;

namespace Mandater.Repository
{
    public interface IElectionRepository
    {
        // Elections
        IEnumerable<IElection> GetElections([Optional] ElectionType electionType);
        IElection GetElectionByYear(ElectionType electionType, int year);

        // Results
        IEnumerable<IResult> GetResults([Optional] ElectionType electionType);
        IEnumerable<IResult> GetResultsByParty(ElectionType electionType, IParty party);
        IEnumerable<IResult> GetResultsByElection(IElection election);
        IEnumerable<IResult> GetResultsByYear(ElectionType electionType, int year);
        IEnumerable<IResult> GetResultsByCounty(County county);

    }
}
