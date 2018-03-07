using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Models;
using Mandater.Repository;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Mandater.Tests
{
    public class CustomValidationTests
    {
        [Fact]
        public void ValidateCountryTest()
        {
            Country country = GetCountry(1);
            CustomValidation.ValidateCountry(country, new HashSet<int>());
        }

        [Theory]
        [InlineData(true, "Norway", "NO")]
        [InlineData(false, null, "NO")]
        [InlineData(false, "Norway", null)]
        public void ValidateCountryMissingDataTest(bool useNull, string internationalName, string shortName)
        {
            // Testing attempt on adding model with missing data
            Country country = new Country { InternationalName = internationalName, ShortName = shortName };
            if (useNull) country = null;

            Assert.Throws<ArgumentException>(() => CustomValidation.ValidateCountry(country, new HashSet<int>()));
        }

        [Fact]
        public void ValidateElectionTypeTest()
        {
            Country country = GetCountry(1);
            ElectionType electionType = GetElectionType(1, country);
            CustomValidation.ValidateElectionType(electionType, new HashSet<int>());
        }

        [Theory]
        [InlineData(true, null, 1)]
        [InlineData(false, "Parliamentary election", -1)]
        [InlineData(false, "Parliamentary election", 0)]
        [InlineData(false, null, 1)]
        public void ValidateElectionTypeMissingDataTest(bool useNull, string internationalName, int useCountry)
        {
            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);

            ElectionType electionType = new ElectionType { Country = country, InternationalName = internationalName };
            if (useNull) electionType = null;

            Assert.Throws<ArgumentException>(() => CustomValidation.ValidateElectionType(electionType, new HashSet<int>()));
        }

        [Fact]
        public void ValidateElectionTest()
        {
            Country country = GetCountry(1);
            ElectionType electionType = GetElectionType(1, country);
            Election election = GetElection(1, country, electionType);
            CustomValidation.ValidateElection(election, new HashSet<int>());
        }

        [Theory]
        [InlineData(true, -1, "Sainte Laguës", 1.4, 4.0, 150, 19, 1, 1)]
        [InlineData(false, 2018, "Sainte Laguës", 1.4, 4.0, 150, 19, 1, -1)]
        [InlineData(false, 2018, "Sainte Laguës", 1.4, 4.0, 150, 19, 1, 0)]
        [InlineData(false, 2018, "Sainte Laguës", 1.4, 4.0, 150, 19, -1, 1)]
        [InlineData(false, 2018, "Sainte Laguës", 1.4, 4.0, 150, 19, 0, 1)]
        [InlineData(false, 2018, "Sainte Laguës", 1.4, 4.0, 150, -1, 1, 1)]
        [InlineData(false, 2018, "Sainte Laguës", 1.4, 4.0, -1, 19, 1, 1)]
        [InlineData(false, 2018, "Sainte Laguës", 1.4, double.NaN, 150, 19, 1, 1)]
        [InlineData(false, 2018, "Sainte Laguës", double.NaN, 4.0, 150, 19, 1, 1)]
        [InlineData(false, 2018, null, 1.4, 4.0, 150, 19, 1, 1)]
        [InlineData(false, -1, "Sainte Laguës", 1.4, 4.0, 150, 19, 1, 1)]
        public void ValidateElectionMissingDataTest(bool useNull, int year, string algorithm, double firstDivisor, double threshold, int seats, int levelingSeats, int useElectionType, int useCountry)
        {
            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);
            ElectionType electionType = GetElectionType(useElectionType, country);

            Election election = new Election() { Country = country, ElectionType = electionType, Year = year, Algorithm = algorithm, FirstDivisor = firstDivisor, Threshold = threshold, Seats = seats, LevelingSeats = levelingSeats };
            if (useNull) election = null;

            Assert.Throws<ArgumentException>(() => CustomValidation.ValidateElection(election, new HashSet<int>()));
        }


        [Fact]
        public void ValidateCountyTest()
        {
            Country country = GetCountry(1);
            County county = GetCounty(1, country);
            CustomValidation.ValidateCounty(county, new HashSet<int>());
        }

        [Theory]
        [InlineData(true, null, 1)]
        [InlineData(false, "Akershus", -1)]
        [InlineData(false, "Akershus", 0)]
        [InlineData(false, null, 1)]
        public void ValidateCountyMissingDataTest(bool useNull, string name, int useCountry)
        {
            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);

            County county = new County() { Country = country, Name = name };
            if (useNull) county = null;

            Assert.Throws<ArgumentException>(() => CustomValidation.ValidateCounty(county, new HashSet<int>()));
        }

        [Fact]
        public void ValidateCountyDataTest()
        {
            Country country = GetCountry(1);
            County county = GetCounty(1, country);
            CountyData countyData = new CountyData { Areal = 24.1, Population = 104, Year = 2018, County = county };
            CustomValidation.ValidateCountyData(countyData, new HashSet<int>());
        }

        [Theory]
        [InlineData(true, double.NaN, -1, -1, 1)]
        [InlineData(false, 24.1, 104, 2018, -1)]
        [InlineData(false, 24.1, 104, 2018, 0)]
        [InlineData(false, 24.1, 104, -1, 1)]
        [InlineData(false, 24.1, -1, 2018, 1)]
        [InlineData(false, double.NaN, 104, 2018, 1)]
        public void ValidateCountyDataMissingDataTest(bool useNull, double areal, int population, int year, int useCounty)
        {
            // Testing attempt on adding model with missing data
            Country country = GetCountry(1);
            County county = GetCounty(useCounty, country);

            CountyData countyData = new CountyData { Areal = areal, Population = population, Year = year, County = county };
            if (useNull) countyData = null;

            Assert.Throws<ArgumentException>(() => CustomValidation.ValidateCountyData(countyData, new HashSet<int>()));
        }

        [Fact]
        public void ValidatePartyTest()
        {
            Country country = GetCountry(1);
            Party party = GetParty(1, country);
            CustomValidation.ValidateParty(party, new HashSet<int>());
        }

        [Theory]
        [InlineData(true, null, 1)]
        [InlineData(false, "Studentene", -1)]
        [InlineData(false, "Studentene", 0)]
        [InlineData(false, null, 1)]
        public void ValidatePartyMissingDataTest(bool useNull, string name, int useCountry)
        {
            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);

            Party party = new Party { Country = country, Name = name };
            if (useNull) party = null;

            Assert.Throws<ArgumentException>(() => CustomValidation.ValidateParty(party, new HashSet<int>()));
        }

        [Fact]
        public void ValidateResultTest()
        {
            Country country = GetCountry(1);
            County county = GetCounty(1, country);
            ElectionType electionType = GetElectionType(1, country);
            Election election = GetElection(1, country, electionType);
            Party party = GetParty(1, country);
            Result result = new Result { County = county, Election = election, Party = party, Percentage = 24.1, Votes = 104 };
            CustomValidation.ValidateResult(result, new HashSet<int>());
        }

        [Theory]
        [InlineData(true, 1, 1, 1, double.NaN, -1)]
        [InlineData(false, -1, 1, 1, 24.1, 104)]
        [InlineData(false, 0, 1, 1, 24.1, 104)]
        [InlineData(false, 1, -1, 1, 24.1, 104)]
        [InlineData(false, 1, 0, 1, 24.1, 104)]
        [InlineData(false, 1, 1, -1, 24.1, 104)]
        [InlineData(false, 1, 1, 0, 24.1, 104)]
        [InlineData(false, 1, 1, 1, double.NaN, 104)]
        [InlineData(false, 1, 1, 1, 24.1, -1)]
        public void ValidateResultMissingDataTest(bool useNull, int useCounty, int useElection, int useParty, double percentage, int votes)
        {
            Country country = GetCountry(1);
            ElectionType electionType = GetElectionType(1, country);
            Election election = GetElection(useElection, country, electionType);
            County county = GetCounty(useCounty, country);
            Party party = GetParty(useParty, country);

            Result result = new Result { County = county, Election = election, Party = party, Percentage = percentage, Votes = votes };
            if (useNull) result = null;

            Assert.Throws<ArgumentException>(() => CustomValidation.ValidateResult(result, new HashSet<int>()));
        }

        private static Country GetCountry(int useCountry)
        {
            switch (useCountry)
            {
                case 1:
                    return new Country() { InternationalName = "Norway", ShortName = "NO" };
                case 0:
                    return new Country() { InternationalName = null };
                default:
                    return null;
            }
        }

        private static County GetCounty(int useCounty, Country country)
        {
            switch (useCounty)
            {
                case 1:
                    return new County { Country = country, CountyId = 1, Name = "Akershus" };
                case 0:
                    return new County { Country = country, CountyId = 1, Name = null };
                default:
                    return null;
            }
        }

        private static ElectionType GetElectionType(int useElectionType, Country country)
        {
            switch (useElectionType)
            {
                case 1:
                    return new ElectionType() { Country = country, InternationalName = "Parliamentary election" };
                case 0:
                    return new ElectionType() { Country = country, InternationalName = null };
                default:
                    return null;
            }
        }

        private static Election GetElection(int useElection, Country country, ElectionType electionType)
        {
            switch (useElection)
            {
                case 1:
                    return new Election() { Country = country, ElectionType = electionType, Year = 2018, Algorithm = "Sainte Laguës (modified)", FirstDivisor = 1.4, Threshold = 4.0, Seats = 150, LevelingSeats = 19};
                case 0:
                    return new Election() { Country = country, ElectionType = electionType, Year = 2018, FirstDivisor = 1.4, Threshold = 4.0, Seats = 150, LevelingSeats = 19 };
                default:
                    return null;
            }
        }

        private static Party GetParty(int useParty, Country country)
        {
            switch (useParty)
            {
                case 1:
                    return new Party { Country = country, Name = "Studentene" };
                case 0:
                    return new Party { Country = country, Name = null };
                default:
                    return null;
            }
        }
    }
}
