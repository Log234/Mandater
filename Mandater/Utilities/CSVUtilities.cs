using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using System.IO;
using Mandater.Models;

namespace Mandater.Utilities
{
    public class CsvFileFormatException : System.FormatException
    {
        public string Path { get; set; }
        public string Line { get; set; }

        public CsvFileFormatException(string exText, string path, string line) : base(exText)
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
    }
}
