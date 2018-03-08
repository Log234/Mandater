using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Utilities
{
    public interface ICsvFormat
    {
        void Parse(string path, string line);
    }

    public class CountryFormat : ICsvFormat
    {
        string ShortName { get; set; }
        string InternationalName { get; set; }

        public void Parse(string path, string line)
        {
            string[] fields = line.Split(";");
            if (fields.Length != 2)
            {
                throw new CsvFileFormatException("The line contains an unexpected number of fields, expected number was 2.", path, line);
            }

            ShortName = fields[0];
            if (ShortName.Length < 2)
            {
                throw new CsvFileFormatException("Country.ShortName cannot be less than 2 characters.", path, line);
            }

            InternationalName = fields[1];
            if (InternationalName.Length < 3)
            {
                throw new CsvFileFormatException("Country.InternationalName cannot be less than 3 characters.", path, line);
            }
        }
    }

    public class ElectionTypeFormat : ICsvFormat
    {
        string Id { get; set; }
        string InternationalName { get; set; }

        public void Parse(string path, string line)
        {
            string[] fields = line.Split(";");
            if (fields.Length != 2)
            {
                throw new CsvFileFormatException("The line contains an unexpected number of fields, expected number was 2.", path, line);
            }

            Id = fields[0];
            if (Id.Length < 2)
            {
                throw new CsvFileFormatException("ElectionType.Id cannot be less than 2 characters.", path, line);
            }

            InternationalName = fields[1];
            if (InternationalName.Length < 3)
            {
                throw new CsvFileFormatException("ElectionType.InternationalName cannot be less than 3 characters.", path, line);
            }
        }
    }
}
