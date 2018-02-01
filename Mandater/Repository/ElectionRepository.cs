using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Models;

namespace Mandater.Repository
{
    public class ElectionRepository: IElectionRepository
    {
        private ElectionContext context;

        public ElectionRepository(ElectionContext context)
        {
            this.context = context;
        }

        // Elections
        public IEnumerable<IElection> GetElections(ElectionType electionType)
        {
            return context.Elections.Where(e => e.ElectionType == electionType);
        }

        public IElection GetElectionByYear(ElectionType electionType, int year)
        {
            return context.Elections.Single(e => e.ElectionType == electionType && e.Year == year);
        }

        // Results
        public IEnumerable<IResult> GetResults(ElectionType electionType)
        {
            return context.Results.Where(r => r.Election.ElectionType == electionType);
        }

        public IEnumerable<IResult> GetResultsByParty(ElectionType electionType, IParty party)
        {
            return context.Results.Where(r => r.Party.Name.Equals(party.Name));
        }

        public IEnumerable<IResult> GetResultsByElection(IElection election)
        {
            return GetResultsByYear(election.ElectionType, election.Year);
        }

        public IEnumerable<IResult> GetResultsByYear(ElectionType electionType, int year)
        {
            return context.Results.Where(r => r.Election.ElectionType == electionType && r.Election.Year == year);
        }
        
        public IEnumerable<IResult> GetResultsByCounty(County county)
        {
            throw new NotImplementedException();
        }

    }
}
