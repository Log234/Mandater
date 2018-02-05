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
        IEnumerable<Election> GetElections(Country country, [Optional] ElectionType electionType);
        Election GetElectionByYear(ElectionType electionType, int year);

        // Results
        IEnumerable<Result> GetResults([Optional] ElectionType electionType);
        IEnumerable<Result> GetResultsByParty(ElectionType electionType, Party party);
        IEnumerable<Result> GetResultsByYear(ElectionType electionType, int year);
        IEnumerable<Result> GetResultsByCounty(County county);

        // Add data
        void AddParty(Party party);
        void AddElection(Election election);
    }
}
