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
        /// <summary>
        /// Initializes the database, if the db is empty this method will build a model to seed it.
        /// </summary>
        /// <param name="context">The context to be initialized.</param>
        /// <param name="logger">Where to log any issues.</param>
        public static void Initialize(ElectionContext context, ILogger logger)
        {
            const string root = "Data/Countries";

            // Make sure the DB is ready and empty
            context.Database.EnsureCreated();
            if (context.Countries.Any()) return;

            // Catch all Argument/KeyNotFound/CsvFileFormatExceptions thrown by model validation
            try
            {
                Dictionary<string, string> countryNames = CSVUtilities.CsvToDictionary(root + "/Countries.csv");

                // Iterate through countries
                string[] countryPaths = Directory.GetDirectories(root);
                if (countryPaths.Length != countryNames.Count)
                {
                    throw new ArgumentException("The number of directories in Data/States does not match the number found in States.csv");
                }

                foreach (string country in countryPaths)
                {

                    // Check if the countryId is valid
                    string countryId = Path.GetFileName(country);
                    if (!countryNames.TryGetValue(countryId, out string countryName))
                    {
                        throw new KeyNotFoundException($"Could not find any entry with the countryId: {countryId}");
                    }

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
                    if (electionTypes.Length != electionTypeNames.Count)
                    {
                        throw new ArgumentException($"The number of directories in {country} does not match the number found in ElectionTypes.csv.");
                    }

                    foreach (string electionType in electionTypes)
                    {
                        // Check if the electionTypeId is valid
                        string electionTypeId = Path.GetFileName(electionType);
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
                        string[] electionFiles = Directory.GetFiles(electionType);
                        Election[] elections = CSVUtilities.CsvToElectionArray(electionType + "/Elections.csv", countryModel, electionTypeModel);
                        if (electionFiles.Length != elections.Length + 1)
                        {
                            throw new ArgumentException($"The number of elections in {electionType} does not match the number found in Elections.csv.");
                        }

                        foreach (string electionFile in electionFiles)
                        {
                            if (!Path.GetFileName(electionFile).Equals("Elections.csv"))
                            {
                                VDModel[] entities = CSVUtilities.CsvToVdArray(electionFile);
                                int year = int.Parse(Path.GetFileNameWithoutExtension(electionFile));
                                Election electionModel = elections.Single(e => e.Year == year);
                                CustomValidation.ValidateElection(electionModel, validationSet);
                                context.Elections.Add(electionModel);

                                ModelBuilderUtilities.ResultModelBuilder(context, electionModel, entities, validationSet);
                            }
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
}
