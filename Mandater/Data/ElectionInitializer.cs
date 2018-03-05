using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Mandater.Models;
using Mandater.Repository;
using Mandater.Utilities;
using Microsoft.Extensions.Logging;

namespace Mandater.Data
{
    public class ElectionInitializer
    {
        public static void Initialize(ElectionContext context, ILogger logger)
        {
            // Make sure the DB is ready and empty
            context.Database.EnsureCreated();
            if (!context.Countries.Any())
            {
                Dictionary<string, string> countryNames = CSVUtilities.CsvToDictionary("Data/States/States.csv");
                if (countryNames == null)
                {
                    logger.LogError("States.csv is malformed and could not be parsed.");
                    return;
                }

                // Iterate through countries
                string[] countries = Directory.GetDirectories("Data/States");
                foreach (string country in countries)
                {
                    // Catch all ArgumentExceptions thrown by model validation
                    try
                    {
                        // Check if the countryId is valid
                        string countryId = Path.GetDirectoryName(country);
                        bool found = countryNames.TryGetValue(countryId, out string countryName);
                        if (!found)
                        {
                            logger.LogError($"The CountryID {countryId} was not found in the dictionary.");
                            break;
                        }

                        // Create a model based on the InternationalName and ShortName
                        HashSet<int> validationSet = new HashSet<int>();
                        Country countryModel = new Country { InternationalName = countryName, ShortName = countryId };
                        CustomValidation.ValidateCountry(countryModel, validationSet);
                        context.Countries.Add(countryModel);


                        // Get a list of ElectionTypeIDs and their names
                        Dictionary<string, string> electionTypeNames = CSVUtilities.CsvToDictionary(country + "/ElectionTypes.csv");
                        if (electionTypeNames == null)
                        {
                            logger.LogError($"{country + "/ElectionTypes.csv"} is malformed and could not be parsed.");
                            break;
                        }

                        // Iterate through the country's election types
                        string[] electionTypes = Directory.GetDirectories(country);
                        foreach (string electionType in electionTypes)
                        {
                            // Check if the electionTypeId is valid
                            string electionTypeId = Path.GetDirectoryName(electionType);
                            found = electionTypeNames.TryGetValue(electionTypeId, out string electionTypeName);
                            if (!found)
                            {
                                logger.LogError($"The ElectionTypeID {electionTypeId} was not found in the dictionary.");
                                break;
                            }

                            // Create an election type model based on the Country and InternationalName
                            ElectionType electionTypeModel = new ElectionType { Country = countryModel, InternationalName = electionTypeName };
                            CustomValidation.ValidateElectionType(electionTypeModel, validationSet);
                            context.ElectionTypes.Add(electionTypeModel);

                            // Iterate through the elections
                            string[] elections = Directory.GetFiles(electionType);
                            foreach (string election in elections)
                            {
                                VDModel[] entities = CSVUtilities.CsvToVdArray(election);
                                ElectionModelBuilder(context, electionTypeModel, entities, validationSet);
                            }
                        }
                        CustomValidation.ValidateCountry(countryModel, new HashSet<int>());
                    }
                    catch (ArgumentException argumentException)
                    {
                        logger.LogError(argumentException,
                            $"{country} results in an illegal model and could not be built.");
                    }
                }
                context.SaveChanges();
            }
        }

        private static void ElectionModelBuilder(ElectionContext context, ElectionType electionType, VDModel[] entities, HashSet<int> validationSet)
        {
            // TODO Need to implement a way to retrieve this data
            Election election = new Election
            {
                Country = electionType.Country,
                ElectionType = electionType,
                Year = 2017,
                Algorithm = "Sainte Laguës (modified)",
                FirstDivisor = 1.4,
                Threshold = 4.0,
                Seats = 150,
                LevelingSeats = 19
            };
            CustomValidation.ValidateElection(election, validationSet);
            context.Elections.Add(election);

            foreach (VDModel entity in entities)
            {
                County county = context.Counties.Find(electionType.CountryId, entity.Fylkenavn);
                if (county == null)
                {
                    county = new County { Country = electionType.Country, Name = entity.Fylkenavn };
                    CustomValidation.ValidateCounty(county, validationSet);
                    context.Counties.Add(county);
                }

                Party party = context.Parties.Find(electionType.CountryId, entity.Partinavn);
                if (party == null)
                {
                    party = new Party { Country = electionType.Country, Name = entity.Partinavn, ShortName = entity.Partikode };
                    CustomValidation.ValidateParty(party, validationSet);
                    context.Parties.Add(party);
                }

                if (!double.TryParse(entity.OppslutningProsentvis, out double percentage))
                {
                    throw new ArgumentException($"{entity.Fylkenavn} - {entity.Partinavn} has an invalid percentage which could not be parsed.");
                }
                if (!int.TryParse(entity.AntallStemmerTotalt, out int votes))
                {
                    throw new ArgumentException($"{entity.Fylkenavn} - {entity.Partinavn} has an invalid total number of votes which could not be parsed.");
                }

                Result result = new Result
                {
                    County = county,
                    Election = election,
                    Party = party,
                    Percentage = percentage,
                    Votes = votes
                };
                CustomValidation.ValidateResult(result, validationSet);
                context.Results.Add(result);
            }
        }
    }
}
