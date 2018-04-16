using Mandater.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Utilities
{
    public static class ModelBuilder
    {
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
                    Counties = new List<County>()
                };
                electionModels.Add(electionModel);
            }
            return electionModels;
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
                    Elections = new List<Election>()
                };
                electionTypeModels.Add(electionTypeModel);
            }
            return electionTypeModels;
        }

        public static List<County> BuildCounties(List<ResultFormat> results, IEnumerable<CountyDataFormat> countyData)
        {
            List<County> countyModels = new List<County>();
            foreach (ResultFormat resultFormat in results)
            {
                CountyDataFormat curCountyData = countyData.Single(cD => cD.County.Equals(resultFormat.Fylkenavn));

                County countyModel = new County()
                {
                    Name = resultFormat.Fylkenavn,
                    Seats = curCountyData.Seats,
                    Results = new List<Result>()
                };
                countyModels.Add(countyModel);
            }
            return countyModels;
        }

        public static List<Result> BuildResults(IEnumerable<ResultFormat> results)
        {
            List<Result> resultModels = new List<Result>();
            foreach (ResultFormat result in results)
            {
                Result resultModel = new Result()
                {
                    PartyName = result.Partinavn,
                    PartyCode = result.Partikode,
                    Votes = result.AntallStemmerTotalt,
                    Percentage = result.OppslutningProsentvis
                };
                resultModels.Add(resultModel);
            }
            return resultModels;
        }
    }
}
