using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Mandater.Repository
{
    public class ElectionRepository : IElectionRepository
    {
        private readonly ElectionContext context;

        public ElectionRepository(ElectionContext context)
        {
            this.context = context;
        }

        // Get all data
        public IEnumerable<Country> GetAllData()
        {
            return context.Countries
                .Include(c => c.Parties)
                .Include(c => c.Counties)
                .ThenInclude(co => co.CountyData)
                .Include(c => c.ElectionTypes)
                .ThenInclude(eT => eT.Elections)
                .ThenInclude(e => e.Results);
        }


        // Countries
        public IEnumerable<Country> GetCountries()
        {
            return context.Countries;
        }

        public Country GetCountry(string country)
        {
            return context.Countries.Find(country);
        }


        // Counties
        public IEnumerable<County> GetCountiesByCountry(string country)
        {
            return context.Counties.Where(c => c.Country.InternationalName.Equals(country));
        }

        public IEnumerable<County> GetCountiesByElection(Election election)
        {
            throw new NotImplementedException();
        }

        public County GetCounty(string country, string county)
        {
            throw new NotImplementedException();
        }

        // CountyData
        public IEnumerable<CountyData> GetCountyDataByCounty(string county)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<CountyData> GetCountyDataByElection(Election election)
        {
            throw new NotImplementedException();
        }

        public CountyData GetCountyData(string county, int year)
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
            context.Countries.Add(country);
            context.SaveChanges();
        }

        public void AddCounty(County county)
        {
            context.Counties.Add(county);
            context.SaveChanges();
        }

        public void AddCountyData(CountyData countyData)
        {
            context.CountyData.Add(countyData);
            context.SaveChanges();
        }

        public void AddElection(Election election)
        {
            context.Elections.Add(election);
            context.SaveChanges();
        }

        public void AddElectionType(ElectionType electionType)
        {
            context.ElectionTypes.Add(electionType);
            context.SaveChanges();
        }

        public void AddResult(Result result)
        {
            context.Results.Add(result);
            context.SaveChanges();
        }
    }
}
