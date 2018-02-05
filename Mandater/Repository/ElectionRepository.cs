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
        public IEnumerable<Election> GetElections(ElectionType electionType)
        {
            return context.Elections.Where(e => e.ElectionType == electionType);
        }

        public Election GetElectionByYear(ElectionType electionType, int year)
        {
            return context.Elections.Single(e => e.ElectionType == electionType && e.Year == year);
        }


        // Results
        public IEnumerable<Result> GetResults(ElectionType electionType)
        {
            return context.Results.Where(r => r.Election.ElectionType == electionType);
        }

        public IEnumerable<Result> GetResultsByParty(ElectionType electionType, Party party)
        {
            return context.Results.Where(r => r.Party == party);
        }

        public IEnumerable<Result> GetResultsByYear(ElectionType electionType, int year)
        {
            return context.Results.Where(r => r.Election.ElectionType == electionType && r.Election.Year == year);
        }
        
        public IEnumerable<Result> GetResultsByCounty(County county)
        {
            throw new NotImplementedException();
        }


        // Add data
        public void AddParty(Party party)
        {
            context.Add(party);
            context.SaveChanges();
        }

        public void AddElection(Election election)
        {
            context.Elections.Add(election);
            foreach (Result result in election.Results)
            {
                context.Results.Add(result);
            }

            context.SaveChanges();
        }
    }
}
