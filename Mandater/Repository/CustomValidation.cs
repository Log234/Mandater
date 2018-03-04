using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Models;

namespace Mandater.Repository
{
    public class CustomValidation
    {
        public static void ValidateCountry(Country country, HashSet<int> checkedModels)
        {
            if (country == null)
            {
                throw new ArgumentException("Country cannot be null.");
            }

            if (country.Name == null)
            {
                throw new ArgumentException("Country.Name cannot be null.");
            }
            if (country.InternationalName == null)
            {
                throw new ArgumentException("Country.InternationalName cannot be null.");
            }
            if (country.ShortName == null)
            {
                throw new ArgumentException("Country.ShortName cannot be null.");
            }
            if (country.Name.Length < 3)
            {
                throw new ArgumentException("Country.Name cannot be shorter than 3 characters.");
            }
            if (country.InternationalName.Length < 3)
            {
                throw new ArgumentException("Country.InternationalName cannot be shorter than 3 characters.");
            }
            if (country.ShortName.Length < 2)
            {
                throw new ArgumentException("Country.ShortName cannot be shorter than 2 characters.");
            }

            checkedModels.Add(country.GetHashCode());

            if (country.Counties != null)
            {
                foreach (County county in country.Counties)
                {
                    if (!checkedModels.Contains(county.GetHashCode()))
                    {
                        ValidateCounty(county, checkedModels);
                    }
                }
            }

            if (country.Parties != null)
            {
                foreach (Party party in country.Parties)
                {
                    if (!checkedModels.Contains(party.GetHashCode()))
                    {
                        ValidateParty(party, checkedModels);
                    }
                }
            }

            if (country.ElectionTypes != null)
            {
                foreach (ElectionType electionType in country.ElectionTypes)
                {
                    if (!checkedModels.Contains(electionType.GetHashCode()))
                    {
                        ValidateElectionType(electionType, checkedModels);
                    }
                }
            }
        }

        public static void ValidateCounty(County county, HashSet<int> checkedModels)
        {
            if (county == null)
            {
                throw new ArgumentException("County cannot be null.");
            }

            if (county.Name == null)
            {
                throw new ArgumentException("County.Name cannot be null.");
            }
            if (county.Name.Length < 2)
            {
                throw new ArgumentException("County.Name cannot be shorter than 3 characters.");
            }

            checkedModels.Add(county.GetHashCode());

            if (county.Country != null)
            {
                if (!checkedModels.Contains(county.Country.GetHashCode()))
                {
                    ValidateCountry(county.Country, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("County.Country cannot be null.");
            }

            if (county.CountyData != null)
            {
                foreach (CountyData countyData in county.CountyData)
                {
                    if (!checkedModels.Contains(countyData.GetHashCode()))
                    {
                        ValidateCountyData(countyData, checkedModels);
                    }
                }
            }
        }

        public static void ValidateCountyData(CountyData countyData, HashSet<int> checkedModels)
        {
            if (countyData == null)
            {
                throw new ArgumentException("CountyData cannot be null.");
            }

            if (countyData.Year == -1)
            {
                throw new ArgumentException("CountyData.Year cannot be the default value.");
            }
            if (countyData.Population == -1)
            {
                throw new ArgumentException("CountyData.Population cannot be the default value.");
            }
            if (double.IsNaN(countyData.Areal))
            {
                throw new ArgumentException("CountyData.Areal cannot be null.");
            }


            checkedModels.Add(countyData.GetHashCode());

            if (countyData.County != null)
            {
                if (!checkedModels.Contains(countyData.County.GetHashCode()))
                {
                    ValidateCounty(countyData.County, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("CountyData.County cannot be null.");
            }
        }

        public static void ValidateElection(Election election, HashSet<int> checkedModels)
        {
            if (election == null)
            {
                throw new ArgumentException("Election cannot be null.");
            }
            if (election.Year == -1)
            {
                throw new ArgumentException("Election.Year cannot be the default value.");
            }
            if (election.Algorithm == null)
            {
                throw new ArgumentException("Election.Algorithm cannot be null.");
            }
            if (double.IsNaN(election.FirstDivisor))
            {
                throw new ArgumentException("Election.FirstDivisor cannot be null.");
            }
            if (double.IsNaN(election.Threshold))
            {
                throw new ArgumentException("Election.Threshold cannot be null.");
            }
            if (election.Seats == -1)
            {
                throw new ArgumentException("Election.Seats cannot be the default value.");
            }
            if (election.LevelingSeats == -1)
            {
                throw new ArgumentException("Election.LevelingSeats cannot be the default value.");
            }

            checkedModels.Add(election.GetHashCode());

            if (election.Country != null)
            {
                if (!checkedModels.Contains(election.Country.GetHashCode()))
                {
                    ValidateCountry(election.Country, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("Election.Country cannot be null.");
            }

            if (election.ElectionType != null)
            {
                if (!checkedModels.Contains(election.ElectionType.GetHashCode()))
                {
                    ValidateElectionType(election.ElectionType, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("Election.ElectionType cannot be null.");
            }

            if (election.Results != null)
            {
                foreach (Result result in election.Results)
                {
                    if (!checkedModels.Contains(result.GetHashCode()))
                    {
                        ValidateResult(result, checkedModels);
                    }
                }
            }
        }

        public static void ValidateElectionType(ElectionType electionType, HashSet<int> checkedModels)
        {
            if (electionType == null)
            {
                throw new ArgumentException("ElectionType cannot be null.");
            }

            if (electionType.Name == null)
            {
                throw new ArgumentException("ElectionType.Name cannot be null.");
            }
            if (electionType.Name.Length < 2)
            {
                throw new ArgumentException("ElectionType.Name cannot be shorter than 3 characters.");
            }

            if (electionType.InternationalName == null)
            {
                throw new ArgumentException("ElectionType.InternationalName cannot be null.");
            }
            if (electionType.InternationalName.Length < 3)
            {
                throw new ArgumentException("ElectionType.InternationalName cannot be shorter than 3 characters.");
            }


            checkedModels.Add(electionType.GetHashCode());

            if (electionType.Country != null)
            {
                if (!checkedModels.Contains(electionType.Country.GetHashCode()))
                {
                    ValidateCountry(electionType.Country, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("ElectionType.Country cannot be null.");
            }

            if (electionType.Elections != null)
            {
                foreach (Election election in electionType.Elections)
                {
                    if (!checkedModels.Contains(election.GetHashCode()))
                    {
                        ValidateElection(election, checkedModels);
                    }
                }
            }
        }

        public static void ValidateParty(Party party, HashSet<int> checkedModels)
        {
            if (party == null)
            {
                throw new ArgumentException("Party cannot be null.");
            }

            if (party.Name == null)
            {
                throw new ArgumentException("Party.Name cannot be null.");
            }
            if (party.Name.Length < 2)
            {
                throw new ArgumentException("Party.Name cannot be shorter than 3 characters.");
            }

            if (party.InternationalName?.Length < 1)
            {
                throw new ArgumentException("Party.InternationalName cannot be shorter than 1 character.");
            }
            if (party.ShortName?.Length < 1)
            {
                throw new ArgumentException("Party.ShortName cannot be shorter than 1 character.");
            }

            checkedModels.Add(party.GetHashCode());

            if (party.Country != null)
            {
                if (!checkedModels.Contains(party.Country.GetHashCode()))
                {
                    ValidateCountry(party.Country, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("Party.Country cannot be null.");
            }
        }
        
        public static void ValidateResult(Result result, HashSet<int> checkedModels)
        {
            if (result == null)
            {
                throw new ArgumentException("Result cannot be null.");
            }

            if (result.Votes == -1)
            {
                throw new ArgumentException("Result.Votes cannot be the default value.");
            }
            if (double.IsNaN(result.Percentage))
            {
                throw new ArgumentException("Result.Percentage cannot be the default value.");
            }
            
            checkedModels.Add(result.GetHashCode());

            if (result.Election != null)
            {
                if (!checkedModels.Contains(result.Election.GetHashCode()))
                {
                    ValidateElection(result.Election, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("Result.Election cannot be null.");
            }

            if (result.Party != null)
            {
                if (!checkedModels.Contains(result.Party.GetHashCode()))
                {
                    ValidateParty(result.Party, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("Result.Party cannot be null.");
            }

            if (result.County != null)
            {
                if (!checkedModels.Contains(result.County.GetHashCode()))
                {
                    ValidateCounty(result.County, checkedModels);
                }
            }
            else
            {
                throw new ArgumentException("Result.County cannot be null.");
            }
        }
    }
}
