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
    public class RepositoryTests
    {
        [Fact]
        public void AddCountryRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountryRegularTest")
                .Options;

            // Testing regular single add
            Country country = GetCountry(1);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Equal(1, context.Countries.Count());
                Assert.Equal(country.InternationalName, context.Countries.Single().InternationalName);
            }
        }

        [Theory]
        [InlineData(true, "Norway", "NO")]
        [InlineData(false, null, "NO")]
        [InlineData(false, "Norway", null)]
        public void AddCountryMissingDataTest(bool useNull, string internationalName, string shortName)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountryMissingTest")
                .Options;

            // Testing attempt on adding model with missing data
            Country country = new Country() { InternationalName = internationalName, ShortName = shortName };
            if (useNull) country = null;

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddCountry(country));
            }
        }

        [Fact]
        public void AddCountryDuplicateTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountryDuplicateTest")
                .Options;

            // Testing adding duplicate country
            Country country = GetCountry(1);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddCountry(country));
            }
        }

        [Fact]
        public void AddCountryConflictingTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountryConflictingTest")
                .Options;

            // Testing adding a conflicting entry
            Country country = GetCountry(1);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            Country conflictCountry = new Country() { InternationalName = "Norway", ShortName = "EN" };
            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddCountry(conflictCountry));
            }
        }

        [Fact]
        public void AddElectionTypeRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTypeRegularTest")
                .Options;

            Country country = GetCountry(1);
            ElectionType electionType = GetElectionType(1, country);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddElectionType(electionType);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Single(context.Countries);
                Assert.Single(context.ElectionTypes);
                Assert.Single(context.Countries.Include(c => c.ElectionTypes).Single().ElectionTypes);
                Assert.Equal(electionType.InternationalName, context.Countries.Include(c => c.ElectionTypes).Single().ElectionTypes.Single().InternationalName);
                Assert.Equal(context.Countries.Single().CountryId, context.ElectionTypes.Single().CountryId);
                Assert.Equal(electionType.CountryId, context.ElectionTypes.Single().CountryId);
                Assert.Equal(electionType.InternationalName, context.ElectionTypes.Single().InternationalName);
                Assert.Equal(electionType.InternationalName, context.ElectionTypes.Single().InternationalName);
            }
        }

        [Fact]
        public void AddElectionTypeDuplicateTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTypeDuplicateTest")
                .Options;

            // Testing adding duplicate country
            Country country = GetCountry(1);
            ElectionType electionType = GetElectionType(1, country);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddElectionType(electionType);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddCountry(country));
            }

        }

        [Theory]
        [InlineData(true, null, 1)]
        [InlineData(false, "Parliamentary election", -1)]
        [InlineData(false, "Parliamentary election", 0)]
        [InlineData(false, null, 1)]
        public void AddElectionTypeMissingDataTest(bool useNull, string internationalName, int useCountry)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTypeMissingTest")
                .Options;

            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);

            ElectionType electionType = new ElectionType { Country = country, InternationalName = internationalName };
            if (useNull) electionType = null;

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddElectionType(electionType));
            }
        }

        [Fact]
        public void AddElectionRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionRegularTest")
                .Options;

            Country country = GetCountry(1);
            ElectionType electionType = new ElectionType() { Country = country, InternationalName = "Parliamentary election" };
            Election election = new Election() { Country = country, ElectionType = electionType, Year = 2018, Algorithm = "Sainte Laguës", FirstDivisor = 1.4, Threshold = 4.0, Seats = 19, LevelingSeats = 150 };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddElection(election);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Single(context.Countries);
                Assert.Single(context.ElectionTypes);
                Assert.Single(context.Elections);
                Assert.Equal(country.InternationalName, context.Countries.Single().InternationalName);
                Assert.Equal(electionType.InternationalName, context.ElectionTypes.Single().InternationalName);
                Assert.Equal(election.Year, context.Elections.Single().Year);
            }
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
        public void AddElectionMissingDataTest(bool useNull, int year, string algorithm, double firstDivisor, double threshold, int seats, int levelingSeats, int useElectionType, int useCountry)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTypeMissingTest")
                .Options;

            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);
            ElectionType electionType = GetElectionType(useElectionType, country);

            Election election = new Election() { Country = country, ElectionType = electionType, Year = year, Algorithm = algorithm, FirstDivisor = firstDivisor, Threshold = threshold, Seats = seats, LevelingSeats = levelingSeats };
            if (useNull) election = null;

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddElection(election));
            }
        }

        [Fact]
        public void AddCountyRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountyRegularTest")
                .Options;

            Country country = GetCountry(1);
            County county = GetCounty(1, country);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCounty(county);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Single(context.Countries);
                Assert.Single(context.Counties);
                Assert.Equal(country.InternationalName, context.Countries.Single().InternationalName);
                Assert.Equal(county.Name, context.Counties.Single().Name);
            }
        }

        [Theory]
        [InlineData(true, null, 1)]
        [InlineData(false, "Akershus", -1)]
        [InlineData(false, "Akershus", 0)]
        [InlineData(false, null, 1)]
        public void AddCountyMissingDataTest(bool useNull, string name, int useCountry)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountyMissingTest")
                .Options;

            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);

            County county = new County() { Country = country, Name = name };
            if (useNull) county = null;

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddCounty(county));
            }
        }

        [Fact]
        public void AddCountyDataRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountyDataRegularTest")
                .Options;

            Country country = GetCountry(1);
            County county = GetCounty(1, country);
            CountyData countyData = new CountyData() { Areal = 29542.3, Population = 999394, Year = 2018, County = county };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountyData(countyData);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Single(context.Countries);
                Assert.Single(context.Counties);
                Assert.Single(context.CountyData);
                Assert.Equal(country.InternationalName, context.Countries.Single().InternationalName);
                Assert.Equal(county.Name, context.Counties.Single().Name);
                Assert.Equal(countyData.Areal, context.CountyData.Single().Areal);
            }
        }

        [Theory]
        [InlineData(true, double.NaN, -1, -1, 1)]
        [InlineData(false, 24.1, 104, 2018, -1)]
        [InlineData(false, 24.1, 104, 2018, 0)]
        [InlineData(false, 24.1, 104, -1, 1)]
        [InlineData(false, 24.1, -1, 2018, 1)]
        [InlineData(false, double.NaN, 104, 2018, 1)]
        public void AddCountyDataMissingDataTest(bool useNull, double areal, int population, int year, int useCounty)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTypeMissingTest")
                .Options;

            // Testing attempt on adding model with missing data
            Country country = GetCountry(1);
            County county = GetCounty(useCounty, country);

            CountyData countyData = new CountyData() { Areal = areal, Population = population, Year = year, County = county };
            if (useNull) countyData = null;

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddCountyData(countyData));
            }
        }

        [Fact]
        public void AddPartyRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddPartyRegularTest")
                .Options;

            Country country = GetCountry(1);
            Party party = new Party { Country = country, Name = "Studentene" };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddParty(party);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Single(context.Countries);
                Assert.Single(context.Parties);
                Assert.Equal(country.InternationalName, context.Countries.Single().InternationalName);
                Assert.Equal(party.Name, context.Parties.Single().Name);
            }
        }
        [Theory]
        [InlineData(true, null, 1)]
        [InlineData(false, "Studentene", -1)]
        [InlineData(false, "Studentene", 0)]
        [InlineData(false, null, 1)]
        public void AddPartyMissingDataTest(bool useNull, string name, int useCountry)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountyMissingTest")
                .Options;

            // Testing attempt on adding model with missing data
            Country country = GetCountry(useCountry);

            Party party = new Party { Country = country, Name = name };
            if (useNull) party = null;

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddParty(party));
            }
        }

        [Fact]
        public void AddResultRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddResultRegularTest")
                .Options;

            Country country = GetCountry(1);
            ElectionType electionType = new ElectionType() { Country = country, InternationalName = "Parliamentary election" };
            Election election = new Election() { Country = country, ElectionType = electionType, Year = 2018, Algorithm = "Sainte Laguës", FirstDivisor = 1.4, Threshold = 4.0, Seats = 19, LevelingSeats = 150 };
            County county = GetCounty(1, country);
            Party party = new Party { Country = country, Name = "Studentene" };
            Result result = new Result { County = county, Election = election, Party = party, Percentage = 23.4, Votes = 42 };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddResult(result);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Single(context.Countries);
                Assert.Single(context.ElectionTypes);
                Assert.Single(context.Elections);
                Assert.Single(context.Counties);
                Assert.Single(context.Parties);
                Assert.Single(context.Results);
                Assert.Equal(country.InternationalName, context.Countries.Single().InternationalName);
                Assert.Equal(electionType.InternationalName, context.ElectionTypes.Single().InternationalName);
                Assert.Equal(election.Year, context.Elections.Single().Year);
                Assert.Equal(county.CountyId, context.Counties.Single().CountyId);
                Assert.Equal(party.Name, context.Parties.Single().Name);
                Assert.Equal(result.Percentage, context.Results.Single().Percentage);
            }
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
        public void AddResultMissingDataTest(bool useNull, int useCounty, int useElection, int useParty, double percentage, int votes)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddResultRegularTest")
                .Options;

            Country country = GetCountry(1);
            ElectionType electionType = GetElectionType(1, country);
            Election election = GetElection(useElection, country, electionType);
            County county = GetCounty(useCounty, country);
            Party party = GetParty(useParty, country);

            Result result = new Result { County = county, Election = election, Party = party, Percentage = percentage, Votes = votes };
            if (useNull) result = null;

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddResult(result));
            }
        }

        private static Country GetCountry(int useCountry)
        {
            switch (useCountry)
            {
                case 1:
                    return new Country() { InternationalName = "Norway", ShortName = "NO"};
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
                    return new Election() { Country = country, ElectionType = electionType, Year = 2018 };
                case 0:
                    return new Election() { Country = country, ElectionType = electionType, Year = -1 };
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
