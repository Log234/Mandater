using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Models;
using Microsoft.EntityFrameworkCore.Internal;

namespace Mandater.Repository
{
    public class ElectionRepository: IElectionRepository
    {
        private ElectionContext context;

        public ElectionRepository(ElectionContext context)
        {
            this.context = context;
        }

        // Countries
        public IEnumerable<Country> GetCountries()
        {
            throw new NotImplementedException();
        }

        public Country GetCountry(string country)
        {
            throw new NotImplementedException();
        }


        // Counties
        public IEnumerable<County> GetCountiesByCountry(string country)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<County> GetCountiesByElection(Election election)
        {
            throw new NotImplementedException();
        }

        public County GetCounty(string country, string county)
        {
            throw new NotImplementedException();
        }


        // Election
        public IEnumerable<Election> GetElectionsByElectionType(string country, string electionType)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Election> GetElectionsByElectionType(ElectionType electionType)
        {
            throw new NotImplementedException();
        }
        
        public Election GetElectionByYear(string country, string electionType, int year)
        {
            throw new NotImplementedException();
        }

        public Election GetElectionByYear(ElectionType electionType, int year)
        {
            throw new NotImplementedException();
        }


        // Election type
        public IEnumerable<ElectionType> GetElectionTypesByCountry(string country)
        {
            throw new NotImplementedException();
        }

        public ElectionType GetElectionType(string country, string electionType)
        {
            throw new NotImplementedException();
        }


        // Parties
        public IEnumerable<Party> GetPartiesByCountry(string country)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Party> GetPartiesByElection(Election election)
        {
            throw new NotImplementedException();
        }

        public Party GetParty(string country, string party)
        {
            throw new NotImplementedException();
        }


        // Results
        public IEnumerable<Result> GetResultsByCounty(string country, string electionType, string county)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetResultsByCounty(ElectionType electionType, string county)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetResultsByParty(string country, string electionType, string party)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetResultsByParty(ElectionType electionType, string party)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetResultsByYear(string country, string electionType, int year)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetResultsByYear(ElectionType electionType, int year)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetElectionResults(Election election)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetElectionResultsByParty(Election election, string party)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Result> GetElectionResultsByCounty(Election election, string county)
        {
            throw new NotImplementedException();
        }


        // Add data
        public void AddCountry(Country country)
        {
            Country existing = context.Countries.Find((country.InternationalName));
            if (existing is null)
            {
                context.Countries.Add(country);
            } else if (existing.Name.Equals(country.Name) && existing.ShortName.Equals(country.ShortName))
            {
                
            }
            else
            {
                throw new ArgumentException("The supplied country conflicts with an existing entry.");
            }
        }

        public void AddElection(Election election)
        {
            throw new NotImplementedException();
        }

        public void AddElectionType(ElectionType electionType)
        {
            throw new NotImplementedException();
        }

        public void AddResult(Result result)
        {
            throw new NotImplementedException();
        }
    }
}
