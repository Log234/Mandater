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
                // Catch all ArgumentExceptions thrown by model validation
                try
                {
                    Dictionary<string, string> countryNames = CSVUtilities.CsvToDictionary("Data/States/States.csv");

                    // Iterate through countries
                    string[] countries = Directory.GetDirectories("Data/States");
                    foreach (string country in countries)
                    {

                        // Check if the countryId is valid
                        string countryId = Path.GetDirectoryName(country);
                        string countryName = countryNames[countryId];

                        // Create a model based on the InternationalName and ShortName
                        HashSet<int> validationSet = new HashSet<int>();
                        Country countryModel = new Country {InternationalName = countryName, ShortName = countryId};
                        CustomValidation.ValidateCountry(countryModel, validationSet);
                        context.Countries.Add(countryModel);


                        // Get a list of ElectionTypeIDs and their names
                        Dictionary<string, string> electionTypeNames =
                            CSVUtilities.CsvToDictionary(country + "/ElectionTypes.csv");

                        // Iterate through the country's election types
                        string[] electionTypes = Directory.GetDirectories(country);
                        foreach (string electionType in electionTypes)
                        {
                            // Check if the electionTypeId is valid
                            string electionTypeId = Path.GetDirectoryName(electionType);
                            string electionTypeName = electionTypeNames[electionTypeId];

                            // Create an election type model based on the Country and InternationalName
                            ElectionType electionTypeModel = new ElectionType
                            {
                                Country = countryModel,
                                InternationalName = electionTypeName
                            };
                            CustomValidation.ValidateElectionType(electionTypeModel, validationSet);
                            context.ElectionTypes.Add(electionTypeModel);

                            // Iterate through the elections
                            string[] elections = Directory.GetFiles(electionType);
                            foreach (string election in elections)
                            {
                                VDModel[] entities = CSVUtilities.CsvToVdArray(election);
                                // TODO Need to implement a way to retrieve this data
                                Election electionModel = new Election
                                {
                                    Country = countryModel,
                                    ElectionType = electionTypeModel,
                                    Year = 2017,
                                    Algorithm = "Sainte Laguës (modified)",
                                    FirstDivisor = 1.4,
                                    Threshold = 4.0,
                                    Seats = 150,
                                    LevelingSeats = 19
                                };
                                CustomValidation.ValidateElection(electionModel, validationSet);
                                context.Elections.Add(electionModel);

                                ElectionModelBuilder(context, electionModel, entities, validationSet);
                            }
                        }

                        CustomValidation.ValidateCountry(countryModel, new HashSet<int>());
                    }

                    context.SaveChanges();
                }
                catch (ArgumentException argumentException)
                {
                    logger.LogError(argumentException, "The data results in an illegal model and could not be built.");
                }
                catch (KeyNotFoundException keyNotFoundException)
                {
                    logger.LogError(keyNotFoundException,
                        "The directory name does not match any ID in the dictionary.");
                }
                catch (CsvFileFormatException csvFileFormatException)
                {
                    logger.LogError(csvFileFormatException, "The csv file has a malformed format.");
                }
            }
        }

        private static void ElectionModelBuilder(ElectionContext context, Election election, VDModel[] entities, HashSet<int> validationSet)
        {
            foreach (VDModel entity in entities)
            {
                County county = context.Counties.Find(election.CountryId, entity.Fylkenavn);
                if (county == null)
                {
                    county = new County { Country = election.Country, Name = entity.Fylkenavn };
                    CustomValidation.ValidateCounty(county, validationSet);
                    context.Counties.Add(county);
                }

                Party party = context.Parties.Find(election.CountryId, entity.Partinavn);
                if (party == null)
                {
                    party = new Party { Country = election.Country, Name = entity.Partinavn, ShortName = entity.Partikode };
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
