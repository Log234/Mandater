using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Utilities
{
    public class FieldParser
    {
        private string File { get; set; }
        private string Line { get; set; }

        public FieldParser(string file, string line)
        {
            File = file;
            Line = line;
        }

        public void ParseLength(string[] line, int expectedLength)
        {
            if (line.Length != expectedLength)
            {
                throw new CsvFileFormatException($"The line has incorrect length, expected: {expectedLength}, got: {line.Length}.", File, Line);
            }
        }

        public Algorithm ParseAlgorithm(string value, string field)
        {
            if (!Algorithm.TryParse(value, out Algorithm algorithm))
            {
                throw new CsvFileFormatException($"The field {field} is not a valid algorithm name.", File, Line);
            }
            return algorithm;
        }

        public int ParseInt(string value, string field)
        {
            if (!int.TryParse(value, out int result))
            {
                throw new CsvFileFormatException($"The field {field} is not a valid integer.", File, Line);
            }
            return result;
        }

        public double ParseDouble(string value, string field)
        {
            if (!double.TryParse(value, out double result))
            {
                throw new CsvFileFormatException($"The field {field} is not a valid double.", File, Line);
            }
            return result;
        }
    }
}
