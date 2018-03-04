using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
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
                    // Check if the countryId is valid
                    string countryId = Path.GetDirectoryName(country);
                    bool found = countryNames.TryGetValue(countryId, out string countryName);
                    if (!found)
                    {
                        logger.LogError($"The CountryID {countryId} was not found in the dictionary.");
                        break;
                    }

                    // Create a model based on the InternationalName and ShortName
                    Country countryModel = new Country() { InternationalName = countryName, ShortName = countryId };

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

                        // Create a model based on the Country and InternationalName
                        ElectionType electionTypeModel = new ElectionType() { Country = countryModel, InternationalName = electionTypeName };
                        countryModel.ElectionTypes.Add(electionTypeModel);

                        // Iterate through the elections
                        string[] elections = Directory.GetFiles(electionType);
                        foreach (string election in elections)
                        {
                            VDModel[] entities = CSVUtilities.CsvToVdArray(election);
                            if (entities == null)
                            {
                                logger.LogError($"{election} is malformed and could not be parsed.");
                                break;
                            }
                            ElectionModelBuilder(context, electionTypeModel, entities);
                        }
                    }

                    try
                    {
                        CustomValidation.ValidateCountry(countryModel, new HashSet<int>());
                        context.Countries.Add(countryModel);
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

        private static void ElectionModelBuilder(ElectionContext context, ElectionType electionType, VDModel[] entities)
        {

        }
    }
}
