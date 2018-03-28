using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using System.IO;
using Mandater.Models;
using Mandater.Data;
using Microsoft.Extensions.Logging;

namespace Mandater.Utilities
{
    public class CsvFileFormatException : System.FormatException
    {
        public string Path { get; set; }
        public string Line { get; set; }

        public CsvFileFormatException(string exText, string path, string line) : base(exText + "\nPath: " + path + "\nLine: " + line)
        {
            Path = path;
            Line = line;
        }
    }

    public static class CSVUtilities
    {
        /// <summary>
        /// Reads any .csv file in the default format specified at https://www.valgresultat.no and creates a list of simple string objects based on the schema.
        /// </summary>
        /// <param name="filePath">The relative or absolute path of the file being read, has to be .csv and cannot contain semicolon (;) in any of its fields as that is the delimiter used.</param>
        /// <returns>A list of VDModel objects that can be used for simple in-memory queries or populating a database.</returns>
        public static List<VDModel> CsvToList(string filePath)
        {
            List<VDModel> objects = new List<VDModel>();
            StreamReader file = new StreamReader(filePath);
            string actualHeaderString = file.ReadLine(); // Skip
            string currentLine;
            while ((currentLine = file.ReadLine()) != null)
            {
                string[] objectFields = currentLine.Split(";");
                if (objectFields.Length != 18)
                {
                    throw new CsvFileFormatException($"Found a line with length {objectFields.Length} instead of the required 18.", filePath, currentLine);
                }
                VDModel currentObject = new VDModel
                {
                    Fylkenummer = objectFields[0],
                    Fylkenavn = objectFields[1],
                    Kommunenummer = objectFields[2],
                    Kommunenavn = objectFields[3],
                    Stemmekretsnummer = objectFields[4],
                    Stemmekretsnavn = objectFields[5],
                    Partikode = objectFields[6],
                    Partinavn = objectFields[7],
                    OppslutningProsentvis = objectFields[8],
                    AntallStemmeberettigede = objectFields[9],
                    AntallForhåndsstemmer = objectFields[10],
                    AntallValgtingstemmer = objectFields[11],
                    AntallStemmerTotalt = objectFields[12],
                    EndringProsentSisteTilsvarendeValg = objectFields[13],
                    EndringProsentSisteEkvivalenteValg = objectFields[14],
                    AntallMandater = objectFields[15],
                    AntallUtjevningsmandater = objectFields[16]
                };
                objects.Add(currentObject);
            }
            return objects;
        }

        /// <summary>
        /// Reads any .csv file in the default format specified at https://www.valgresultat.no and creates an array of VDModel objects based on the schema.
        /// </summary>
        /// <param name="filePath">The relative or absolute path of the file being read, has to be .csv and cannot contain semicolon (;) in any of its fields as that is the delimiter used.</param>
        /// <returns>An array of VDModel objects that can be used for simple in-memory queries or populating a database.</returns>
        public static VDModel[] CsvToVdArray(string filePath)
        {
            List<VDModel> objects = new List<VDModel>();
            StreamReader file = new StreamReader(filePath);
            string actualHeaderString = file.ReadLine(); // Skip
            string currentLine;
            while ((currentLine = file.ReadLine()) != null)
            {
                string[] objectFields = currentLine.Split(";");
                if (objectFields.Length != 18)
                {
                    throw new CsvFileFormatException($"Found a line with length {objectFields.Length} instead of the required 18.", filePath, currentLine);
                }
                VDModel currentObject = new VDModel
                {
                    Fylkenummer = objectFields[0],
                    Fylkenavn = objectFields[1],
                    Kommunenummer = objectFields[2],
                    Kommunenavn = objectFields[3],
                    Stemmekretsnummer = objectFields[4],
                    Stemmekretsnavn = objectFields[5],
                    Partikode = objectFields[6],
                    Partinavn = objectFields[7],
                    OppslutningProsentvis = objectFields[8],
                    AntallStemmeberettigede = objectFields[9],
                    AntallForhåndsstemmer = objectFields[10],
                    AntallValgtingstemmer = objectFields[11],
                    AntallStemmerTotalt = objectFields[12],
                    EndringProsentSisteTilsvarendeValg = objectFields[13],
                    EndringProsentSisteEkvivalenteValg = objectFields[14],
                    AntallMandater = objectFields[15],
                    AntallUtjevningsmandater = objectFields[16]
                };
                objects.Add(currentObject);
            }
            return objects.ToArray<VDModel>();
        }

        /// <summary>
        /// Reads any .csv file with exactly two fields per line and returns them as a dictionary using the first field as key and second as value.
        /// </summary>
        /// <param name="filePath">The relative or absolute path of the file being read, has to be .csv and cannot contain semicolon (;) in any of its fields as that is the delimiter used.</param>
        /// <returns>A dictionary over the entries in the csv file.</returns>
        public static Dictionary<string, string> CsvToDictionary(string filePath)
        {
            Dictionary<string, string> entries = new Dictionary<string, string>();
            StreamReader file = new StreamReader(filePath);
            string actualHeaderString = file.ReadLine(); // Skip
            string currentLine;
            while ((currentLine = file.ReadLine()) != null)
            {
                string[] entryFields = currentLine.Split(";");
                if (entryFields.Length != 2)
                {
                    throw new CsvFileFormatException($"Found a line with length {entryFields.Length} instead of the required 2.", filePath, currentLine);
                }
                entries.Add(entryFields[0], entryFields[1]);
            }
            return entries;
        }

        /// <summary>
        /// Reads any csv file following the format "Year;Algorithm;FirstDivisor;Threshold;Seats;LevelingSeats".
        /// </summary>
        /// <param name="filePath">The relative or absolute path of the file being read, has to be .csv and cannot contain semicolon (;) in any of its fields as that is the delimiter used.</param>
        /// <param name="country">The country the election was held in.</param>
        /// <param name="electionType">The type of election it was.</param>
        /// <returns>An array of VDModel objects that can be used for simple in-memory queries or populating a database.</returns>
        public static Election[] CsvToElectionArray(string filePath, Country country, ElectionType electionType)
        {
            List<Election> objects = new List<Election>();
            StreamReader file = new StreamReader(filePath);
            string actualHeaderString = file.ReadLine(); // Skip
            string currentLine;
            while ((currentLine = file.ReadLine()) != null)
            {
                string[] objectFields = currentLine.Split(";");
                if (objectFields.Length != 6)
                {
                    throw new CsvFileFormatException($"Found a line with length {objectFields.Length} instead of the required 6.", filePath, currentLine);
                }
                if (!int.TryParse(objectFields[0], out int year))
                {
                    throw new CsvFileFormatException("The field Year is not a valid integer.", filePath, currentLine);
                }
                if (!AlgorithmUtilities.TryParse(objectFields[1], out Algorithm algorithm))
                {
                    throw new CsvFileFormatException("The field Algorithm is not a valid algorithm name.", filePath, currentLine);
                }
                if (!double.TryParse(objectFields[2], out double firstDivisor))
                {
                    throw new CsvFileFormatException("The field FirstDivisor is not a valid double.", filePath, currentLine);
                }
                if (!double.TryParse(objectFields[3], out double threshold))
                {
                    throw new CsvFileFormatException("The field Threshold is not a valid double.", filePath, currentLine);
                }
                if (!int.TryParse(objectFields[4], out int seats))
                {
                    throw new CsvFileFormatException("The field Seats is not a valid integer.", filePath, currentLine);
                }
                if (!int.TryParse(objectFields[5], out int levelingSeats))
                {
                    throw new CsvFileFormatException("The field LevelingSeats is not a valid integer.", filePath, currentLine);
                }

                Election currentObject = new Election
                {
                    CountyData = new List<CountyData>(),
                    Year = year,
                    Algorithm = algorithm,
                    FirstDivisor = firstDivisor,
                    Threshold = threshold,
                    Seats = seats,
                    LevelingSeats = levelingSeats,
                    Results = new List<Result>()
                };
                System.Console.Write("Year" + currentObject.Year);
                objects.Add(currentObject);
            }
            return objects.ToArray<Election>();
        }
        
        /// <summary>
         /// Reads any csv file following the format "Year;County;Areal;Population".
         /// Will be phased out in v1.1.0 to be replaced with a more generic system.
         /// </summary>
         /// <param name="filePath">The relative or absolute path of the file being read, has to be .csv and cannot contain semicolon (;) in any of its fields as that is the delimiter used.</param>
         /// <param name="country">The country the election was held in.</param>
         /// <param name="electionType">The type of election it was.</param>
         /// <returns>An array of VDModel objects that can be used for simple in-memory queries or populating a database.</returns>
        public static void CsvToCountyData(string filePath, Country country, ElectionContext context)
        {
            List<CountyData> objects = new List<CountyData>();
            StreamReader file = new StreamReader(filePath);
            string actualHeaderString = file.ReadLine(); // Skip
            string currentLine;
            while ((currentLine = file.ReadLine()) != null)
            {
                string[] objectFields = currentLine.Split(";");
                if (objectFields.Length != 4)
                {
                    throw new CsvFileFormatException($"Found a line with length {objectFields.Length} instead of the required 4.", filePath, currentLine);
                }
                if (!int.TryParse(objectFields[0], out int year))
                {
                    throw new CsvFileFormatException("The field Year is not a valid integer.", filePath, currentLine);
                }
                if (!double.TryParse(objectFields[2], out double areal))
                {
                    throw new CsvFileFormatException("The field Areal is not a valid double.", filePath, currentLine);
                }
                if (!int.TryParse(objectFields[3], out int population))
                {
                    throw new CsvFileFormatException("The field Population is not a valid integer.", filePath, currentLine);
                }

                IEnumerable<Election> elections = context.Elections.Where(e => e.Year == year);
                County county = context.Counties.Single(c => c.CountryId == country.CountryId && c.Name.Equals(objectFields[1]));
                if (county == null)
                {
                    throw new CsvFileFormatException($"The field County does not match any known counties.", filePath, currentLine);
                }
                CountyData countyData = new CountyData
                {
                    Year = year,
                    Areal = areal,
                    Population = population,
                    County = county,
                    CountyId = county.CountyId
                };

                foreach (Election election in elections)
                {
                    election.CountyData.Add(countyData);
                }
                context.CountyData.Add(countyData);
            }
        }
    }
}
