using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Utilities
{
    public interface ICsvFormat<T>
    {
        T Parse(string line, FieldParser parser);
    }

    public class ElectionFormat : ICsvFormat<ElectionFormat>
    {
        public int Year { get; set; }
        public Algorithm Algorithm { get; set; }
        public double FirstDivisor { get; set; }
        public double Threshold { get; set; }
        public int Seats { get; set; }
        public int LevelingSeats { get; set; }

        public ElectionFormat Parse(string line, FieldParser parser)
        {
            string[] fields =  parser.ParseLength(line, 6);
            int year = parser.ParseInt(fields[0], "Year");
            Algorithm algorithm = parser.ParseAlgorithm(fields[1], "Algorithm");
            double firstDivisor = parser.ParseDouble(fields[2], "FirstDivisor");
            double threshold = parser.ParseDouble(fields[3], "Threshold");
            int seats = parser.ParseInt(fields[4], "Seats");
            int levelingSeats = parser.ParseInt(fields[5], "LevelingSeats");

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

        public ResultFormat Parse(string line, FieldParser parser)
        {
            string[] fields =  parser.ParseLength(line, 18);
            int fylkenummer = parser.ParseInt(fields[0], "Fylkenummer");
            string fylkenavn = parser.ParseString(fields[1], "Fylkenavn", 3, -1);
            string partikode = parser.ParseString(fields[6], "Partikode", 1, 10);
            string partinavn = parser.ParseString(fields[7], "Partinavn", 3, 20);
            double oppslutningProsentvis = parser.ParseDouble(fields[8], "Oppslutning prosentvis");
            int antallStemmeberettigde = parser.ParseInt(fields[9], "Antall stemmeberettigde");
            int antallForhåndsstemmer = parser.ParseInt(fields[10], "Antall forhåndsstemmer");
            int antallValgtingstemmer = parser.ParseInt(fields[11], "Antall valgtingstemmer");
            int antallStemmerTotalt = parser.ParseInt(fields[12], "AntallStemmerTotalt");
            double endringProsentSisteTilsvarendeValg = parser.ParseDouble(fields[13], "Endring prosent siste tilsvarende valg");
            double endringProsentSisteEkvivalenteValg = parser.ParseDouble(fields[14], "Endring prosent siste ekvivalente valg");
            int antallMandater = parser.ParseInt(fields[15], "Antall mandater");
            int antallUtjevningsmandater = parser.ParseInt(fields[16], "Antall utjevningsmandater");

            return new ResultFormat()
            {
                Fylkenummer = fylkenummer,
                Fylkenavn = fylkenavn,
                Partikode = partikode,
                Partinavn = partinavn,
                OppslutningProsentvis = oppslutningProsentvis,
                AntallStemmeberettigede = antallStemmeberettigde,
                AntallForhåndsstemmer = antallForhåndsstemmer,
                AntallValgtingstemmer = antallValgtingstemmer,
                AntallStemmerTotalt = antallStemmerTotalt,
                EndringProsentSisteTilsvarendeValg = endringProsentSisteTilsvarendeValg,
                EndringProsentSisteEkvivalenteValg = endringProsentSisteEkvivalenteValg,
                AntallMandater = antallMandater,
                AntallUtjevningsmandater = antallUtjevningsmandater
            };
        }
    }

    public class CountryFormat : ICsvFormat<CountryFormat>
    {
        public string CountryCode;
        public string InternationalName;

        public CountryFormat Parse(string line, FieldParser parser)
        {
            string[] fields = parser.ParseLength(line, 2);
            string countryCode = parser.ParseString(fields[0], "Country code", 2, 5);
            string internationalName = parser.ParseString(fields[1], "International name", 3, 30);

            return new CountryFormat()
            {
                CountryCode = countryCode,
                InternationalName = internationalName
            };
        }
    }
    public class ElectionTypeFormat : ICsvFormat<ElectionTypeFormat>
    {
        public string ElectionTypeCode;
        public string InternationalName;

        public ElectionTypeFormat Parse(string line, FieldParser parser)
        {
            string[] fields = parser.ParseLength(line, 2);
            string electionTypeCode = parser.ParseString(fields[0], "Election type code", 2, 5);
            string internationalName = parser.ParseString(fields[1], "International name", 3, 30);

            return new ElectionTypeFormat()
            {
                ElectionTypeCode = electionTypeCode,
                InternationalName = internationalName
            };
        }
    }

    public class CountyDataFormat : ICsvFormat<CountyDataFormat>
    {
        public int Year;
        public string County;
        public double Areal;
        public int Population;
        public int Seats;
        
        public CountyDataFormat Parse(string line, FieldParser parser)
        {
            string[] fields = parser.ParseLength(line, 5);
            int year = parser.ParseInt(fields[0], "Year");
            string county = parser.ParseString(fields[1], "County", 3, 20);
            double areal = parser.ParseDouble(fields[2], "Areal");
            int population = parser.ParseInt(fields[3], "Population");
            int seats = parser.ParseInt(fields[4], "Seats");

            return new CountyDataFormat()
            {
                Year = year,
                County = county,
                Areal = areal,
                Population = population,
                Seats = seats
            };
        }
    }
}
