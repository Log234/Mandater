using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Utilities
{
    public class ElectionFormat : ICsvFormat<ElectionFormat>
    {
        public int Year { get; set; }
        public Algorithm Algorithm { get; set; }
        public double FirstDivisor { get; set; }
        public double Threshold { get; set; }
        public int Seats { get; set; }
        public int LevelingSeats { get; set; }

        public ElectionFormat Parse(string[] line, string filePath, string currentLine)
        {
            FieldParser parser = new FieldParser(filePath, currentLine);

            parser.ParseLength(line, 6);
            int year = parser.ParseInt(line[0], "Year");
            Algorithm algorithm = parser.ParseAlgorithm(line[1], "Algorithm");
            double firstDivisor = parser.ParseDouble(line[2], "FirstDivisor");
            double threshold = parser.ParseDouble(line[3], "Threshold");
            int seats = parser.ParseInt(line[4], "Seats");
            int levelingSeats = parser.ParseInt(line[5], "LevelingSeats");

            return new ElectionFormat()
            {
                Year = year,
                Algorithm = algorithm,
                FirstDivisor = firstDivisor,
                Threshold = threshold,
                Seats = seats,
                LevelingSeats = levelingSeats
            };
        }
    }

    public class ResultFormat : ICsvFormat<ResultFormat>
    {
        public int Fylkenummer { get; set; }
        public string Fylkenavn { get; set; }
        public int Kommunenummer { get; set; }
        public string Kommunenavn { get; set; }
        public int Stemmekretsnummer { get; set; }
        public string Stemmekretsnavn { get; set; }
        public string Partikode { get; set; }
        public string Partinavn { get; set; }
        public double OppslutningProsentvis { get; set; }
        public int AntallStemmeberettigede { get; set; }
        public int AntallForhåndsstemmer { get; set; }
        public int AntallValgtingstemmer { get; set; }
        public int AntallStemmerTotalt { get; set; }
        public double EndringProsentSisteTilsvarendeValg { get; set; }
        public double EndringProsentSisteEkvivalenteValg { get; set; }
        public int AntallMandater { get; set; }
        public int AntallUtjevningsmandater { get; set; }

        public ResultFormat Parse(string[] line, string filePath, string currentLine)
        {
            if (line.Length != 18)
            {
                throw new CsvFileFormatException($"Found a line with length {line.Length} instead of the required 18.", filePath, currentLine);
            }
            if (!int.TryParse(line[0], out int fylkenummer))
            {
                throw new CsvFileFormatException("The field Fylkenummer is not a valid integer.", filePath, currentLine);
            }
            if ()
            fylkenavn = objectFields[1],
            kommunenummer = objectFields[2],
            kommunenavn = objectFields[3],
            stemmekretsnummer = objectFields[4],
            stemmekretsnavn = objectFields[5],
            partikode = objectFields[6],
            partinavn = objectFields[7],
            oppslutningProsentvis = objectFields[8],
            antallStemmeberettigede = objectFields[9],
            antallForhåndsstemmer = objectFields[10],
            antallValgtingstemmer = objectFields[11],
            antallStemmerTotalt = objectFields[12],
            endringProsentSisteTilsvarendeValg = objectFields[13],
            endringProsentSisteEkvivalenteValg = objectFields[14],
            antallMandater = objectFields[15],
            antallUtjevningsmandater = objectFields[16]
        }
    }
}
