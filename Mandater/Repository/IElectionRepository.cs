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
        // All data
        IEnumerable<Country> GetAllData();

            // Countries
        IEnumerable<Country> GetCountries();
        Country GetCountry(string country);

        // Counties
        IEnumerable<County> GetCountiesByCountry(string country);
        IEnumerable<County> GetCountiesByElection(Election election);
        County GetCounty(string country, string county);

        // Elections
        IEnumerable<Election> GetElectionsByElectionType(string country, string electionType);
        IEnumerable<Election> GetElectionsByElectionType(ElectionType electionType);

        Election GetElectionByYear(string country, string electionType, int year);
        Election GetElectionByYear(ElectionType electionType, int year);
        
        // Election types
        IEnumerable<ElectionType> GetElectionTypesByCountry(string country);
        ElectionType GetElectionType(string country, string electionType);

        // Parties
        IEnumerable<Party> GetPartiesByCountry(string country);
        IEnumerable<Party> GetPartiesByElection(Election election);
        Party GetParty(string country, string party);

        // Results
        IEnumerable<Result> GetResultsByCounty(string country, string electionType, string county);
        IEnumerable<Result> GetResultsByCounty(ElectionType electionType, string county);

        IEnumerable<Result> GetResultsByParty(string country, string electionType, string party);
        IEnumerable<Result> GetResultsByParty(ElectionType electionType, string party);

        IEnumerable<Result> GetResultsByYear(string country, string electionType, int year);
        IEnumerable<Result> GetResultsByYear(ElectionType electionType, int year);


        IEnumerable<Result> GetElectionResults(Election election);
        IEnumerable<Result> GetElectionResultsByParty(Election election, string party);
        IEnumerable<Result> GetElectionResultsByCounty(Election election, string county);

        // Add data
        void AddCountry(Country country);
        void AddElection(Election election);
        void AddElectionType(ElectionType electionType);
        void AddResult(Result result);
    }
}
