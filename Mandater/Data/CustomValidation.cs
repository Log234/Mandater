﻿using System;
using System.Collections.Generic;
using Mandater.Models;
using Mandater.Utilities;

namespace Mandater.Data
{
    public static class CustomValidation
    {
        /// <summary>
        /// Checks whether the given country is a valid model, and then proceeds to look through any connected models
        /// that are not in the checkedModels set and ensure that they all result in a valid model.
        /// </summary>
        /// <param name="country">The model to check.</param>
        /// <param name="checkedModels">A set of models that has been checked already.</param>
        public static void ValidateCountry(Country country, HashSet<int> checkedModels)
        {
            if (country == null)
            {
                throw new ArgumentException("Country cannot be null.");
            }

            if (country.InternationalName == null)
            {
                throw new ArgumentException("Country.InternationalName cannot be null.");
            }
            if (country.InternationalName.Length < 3)
            {
                throw new ArgumentException("Country.InternationalName cannot be shorter than 3 characters.");
            }
            if (country.ShortName == null)
            {
                throw new ArgumentException("Country.ShortName cannot be null.");
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


        /// <summary>
        /// Checks whether the given county is a valid model, and then proceeds to look through any connected models
        /// that are not in the checkedModels set and ensure that they all result in a valid model.
        /// </summary>
        /// <param name="county">The model to check.</param>
        /// <param name="checkedModels">A set of models that have already been checked.</param>
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

        /// <summary>
        /// Checks whether the given county data is a valid model, and then proceeds to look through any connected models
        /// that are not in the checkedModels set and ensure that they all result in a valid model.
        /// </summary>
        /// <param name="countyData">The model to check.</param>
        /// <param name="checkedModels">A set of models that have already been checked.</param>
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

        /// <summary>
        /// Checks whether the given election is a valid model, and then proceeds to look through any connected models
        /// that are not in the checkedModels set and ensure that they all result in a valid model.
        /// </summary>
        /// <param name="election">The model to check.</param>
        /// <param name="checkedModels">A set of already checked models.</param>
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
            if (election.Algorithm == Algorithm.Undefined)
            {
                throw new ArgumentException("Election.Algorithm cannot be the default value.");
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

        /// <summary>
        /// Checks whether the given election type is a valid model, and then proceeds to look through any connected models
        /// that are not in the checkedModels set and ensure that they all result in a valid model.
        /// </summary>
        /// <param name="electionType">The model to check.</param>
        /// <param name="checkedModels">A set of already checked models.</param>
        public static void ValidateElectionType(ElectionType electionType, HashSet<int> checkedModels)
        {
            if (electionType == null)
            {
                throw new ArgumentException("ElectionType cannot be null.");
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

        /// <summary>
        /// Checks whether the given party is a valid model, and then proceeds to look through any connected models
        /// that are not in the checkedModels set and ensure that they all result in a valid model.
        /// </summary>
        /// <param name="party">The model to check.</param>
        /// <param name="checkedModels">A set of already checked models.</param>
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

        /// <summary>
        /// Checks whether the given result is a valid model, and then proceeds to look through any connected models
        /// that are not in the checkedModels set and ensure that they all result in a valid model.
        /// </summary>
        /// <param name="result">The model to check.</param>
        /// <param name="checkedModels">A set of already checked models.</param>
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
