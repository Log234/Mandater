using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using System.IO;
using Mandater.Models;

namespace Mandater.Utilities
{
    public static class VDUtilities
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

        public static VDModel[] CsvToArray(string filePath)
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
            return objects.ToArray<VDModel>();
        }
    }
}
