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
    }
}
