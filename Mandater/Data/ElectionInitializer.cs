﻿using System;
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
                List<CountryFormat> countries = CSVUtilities.CsvToList<CountryFormat>(root + "/Countries.csv");
                List<Country> countryModels = ModelBuilder.BuildCountries(countries);
                context.Countries.AddRange(countryModels);

                // Iterate through countries
                string[] countryDirectories = Directory.GetDirectories(root);
                if (countryDirectories.Length != countryModels.Count)
                {
                    throw new ArgumentException($"The number of directories in {root} does not match the number found in States.csv");
                }

                foreach (Country country in countryModels)
                {
                    string path = Path.Combine(root, country.CountryCode);
                    CreateElectionTypes(country, path);
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

        private static void CreateElectionTypes(Country country, string root)
        {
            // Check if the countryId is valid
            if (!File.Exists(root))
            {
                throw new KeyNotFoundException($"Could not find any directory with the country code: {country.CountryCode}");
            }

            // Get a list of ElectionTypeFormats
            List<ElectionTypeFormat> electionTypes =  CSVUtilities.CsvToList<ElectionTypeFormat>(Path.Combine(root, "ElectionTypes.csv"));
            List<ElectionType> electionTypeModels = ModelBuilder.BuildElectionTypes(electionTypes, country);
            country.ElectionTypes.AddRange(electionTypeModels);

            List<CountyDataFormat> countyData = CSVUtilities.CsvToList<CountyDataFormat>(Path.Combine(root, "CountyData.csv"));

            // Iterate through the country's election types
            string[] electionTypeFiles = Directory.GetDirectories(root);
            if (electionTypeFiles.Length != electionTypes.Count)
            {
                throw new ArgumentException($"The number of directories in {root} does not match the number found in ElectionTypes.csv.");
            }

            foreach (ElectionType electionTypeModel in electionTypeModels)
            {
                string path = Path.Combine(root, electionTypeModel.ElectionTypeCode);
                CreateElection(country, electionTypeModel, countyData, path);
            }
        }

        private static void CreateElection(Country country, ElectionType electionType, List<CountyDataFormat> countyData, string root)
        {
            // Check if the electionTypeId is valid
            if (!File.Exists(root))
            {
                throw new KeyNotFoundException($"Could not find any directory with the election type code: {electionType.ElectionTypeCode}");
            }
            
            List<ElectionFormat> elections = CSVUtilities.CsvToList<ElectionFormat>(Path.Combine(root, "Elections.csv"));
            List<Election> electionModels = ModelBuilder.BuildElections(elections, country, electionType);
            electionType.Elections.AddRange(electionModels);

            // Iterate through the elections
            string[] electionFiles = Directory.GetFiles(root);
            if (electionFiles.Length != elections.Count + 1)
            {
                throw new ArgumentException($"The number of elections in {electionType} does not match the number found in Elections.csv.");
            }

            foreach (Election electionModel in electionModels)
            {
                string path = Path.Combine(root, electionModel.Year + ".csv");
                CreateResults(country, electionModel, path);
            }
        }

        private static void CreateResults(Country country, Election election, string root)
        {
            List<ResultFormat> entities = CSVUtilities.CsvToList<ResultFormat>(root);
            List<Result> resultModels = ModelBuilder.
            ModelBuilderUtilities.ResultModelBuilder(context, electionModel, entities, validationSet);
        }
    }
}
