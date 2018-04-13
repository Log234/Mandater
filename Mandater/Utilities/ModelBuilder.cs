using Mandater.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Utilities
{
    public static class ModelBuilder
    {
        public static List<Election> BuildElections(List<ElectionFormat> elections, Country country, ElectionType electionType)
        {
            List<Election> electionModels = new List<Election>();
            foreach (ElectionFormat election in elections)
            {
                Election electionModel = new Election()
                {
                    Year = election.Year,
                    Algorithm = election.Algorithm,
                    FirstDivisor = election.FirstDivisor,
                    Threshold = election.Threshold,
                    Seats = election.Seats,
                    LevelingSeats = election.LevelingSeats,
                    CountryId = country.CountryId,
                    ElectionTypeId = electionType.ElectionTypeId,
                    Counties = new List<County>()
                };
                electionModels.Add(electionModel);
            }
            return electionModels;
        }

        public static List<Country> BuildCountries(List<CountryFormat> countries)
        {
            List<Country> countryModels = new List<Country>();
            foreach (CountryFormat country in countries)
            {
                Country countryModel = new Country()
                {
                    CountryCode = country.CountryCode,
                    InternationalName = country.InternationalName,
                    ElectionTypes = new List<ElectionType>()
                };
                countryModels.Add(countryModel);
            }
            return countryModels;
        }

        public static List<ElectionType> BuildElectionTypes(List<ElectionTypeFormat> electionTypes, Country country)
        {
            List<ElectionType> electionTypeModels = new List<ElectionType>();
            foreach (ElectionTypeFormat electionType in electionTypes)
            {
                ElectionType electionTypeModel = new ElectionType()
                {
                    InternationalName = electionType.InternationalName,
                    ElectionTypeCode = electionType.ElectionTypeCode,
                    CountryId = country.CountryId,
                    Elections = new List<Election>()
                };
                electionTypeModels.Add(electionTypeModel);
            }
            return electionTypeModels;
        }
    }
}
