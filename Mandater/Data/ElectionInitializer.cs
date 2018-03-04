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
            context.Database.EnsureCreated();
            if (!context.Countries.Any())
            {
                string[] countries = Directory.GetDirectories("Data/State");
                foreach (string country in countries)
                {
                    string countryName = Path.GetDirectoryName(country);
                    string[] electionTypes = Directory.GetDirectories(country);
                    foreach (string electionType in electionTypes)
                    {
                        string electionTypeName = Path.GetDirectoryName(electionType);
                        string[] elections = Directory.GetFiles(electionType);
                        foreach (string election in elections)
                        {
                            try
                            {
                                VDModel[] entities = VDUtilities.CsvToArray(election);
                                Country electionModel = ElectionModelBuilder(countryName, electionType, entities);
                                CustomValidation.ValidateCountry(electionModel, new HashSet<int>());
                                context.Countries.Add(electionModel);
                            }
                            catch (IndexOutOfRangeException indexOutOfRangeException)
                            {
                                logger.LogError(indexOutOfRangeException, $"{election} has a malformed format and could not be parsed.");
                            }
                            catch (ArgumentException argumentException)
                            {
                                logger.LogError(argumentException, $"{election} results in an illegal model and could not be built.");
                            }
                        }
                    }
                }
                context.SaveChanges();
            }
        }

        public static Country ElectionModelBuilder(string countryName, string electionType, VDModel[] entities)
        {
            switch (electionType)
            {
                case "ParliamentaryElection":
                    break;

                default:
                    throw new ArgumentException($"{electionType} is an unknown election type and will be ignored.");
            }
            return null;
        }
    }
}
