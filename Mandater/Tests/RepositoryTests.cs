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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Equal(1, context.Countries.Count());
                Assert.Equal(country.Name, context.Countries.Single().Name);
                Assert.Equal(country.InternationalName, context.Countries.Single().InternationalName);
                Assert.Equal(country.ShortName, context.Countries.Single().ShortName);
            }
        }

        [Theory]
        [InlineData(null, null, null)]
        [InlineData("Norge", null, null)]
        [InlineData(null, "Norway", null)]
        [InlineData(null, null, "NO")]
        [InlineData("Norge", "Norway", null)]
        [InlineData(null, "Norway", "NO")]
        public void AddCountryMissingDataTest(string name, string internationalName, string shortName)
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountryMissingTest")
                .Options;

            // Testing attempt on adding model with missing data
            Country country = new Country() { Name = name, InternationalName = internationalName, ShortName = shortName };

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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };

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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            Country conflictCountry = new Country() { Name = "FEIL", InternationalName = "Norway", ShortName = "EN" };
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

            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
            ElectionType electionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election" };

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
                Assert.Equal(electionType.Name, context.Countries.Include(c => c.ElectionTypes).Single().ElectionTypes.Single().Name);
                Assert.Equal(context.Countries.Single().CountryId, context.ElectionTypes.Single().CountryId);
                Assert.Equal(electionType.CountryId, context.ElectionTypes.Single().CountryId);
                Assert.Equal(electionType.Name, context.ElectionTypes.Single().Name);
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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
            ElectionType electionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election" };

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

        [Fact]
        public void AddElectionTypeConflictingTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTypeConflictingTest")
                .Options;

            // Testing adding a conflicting entry
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
            ElectionType type1 = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election" };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddElectionType(type1);
            }

            ElectionType conflictElectionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election2" };
            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<InvalidOperationException>(() => repository.AddElectionType(conflictElectionType));
            }
        }

        [Fact]
        public void AddElectionRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionRegularTest")
                .Options;

            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
            ElectionType electionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election" };
            Election election = new Election() { Country = country, ElectionType = electionType, Year = 2018 };

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

        [Fact]
        public void AddCountyRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountyRegularTest")
                .Options;

            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
            County county = new County() { Country = country, CountyId = 1, Name = "Akershus" };

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
                Assert.Equal(1, context.Counties.Single().CountyId);
            }
        }

        [Fact]
        public void AddCountyDataRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountyDataRegularTest")
                .Options;

            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
            County county = new County() { Country = country, Name = "Akershus" };
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

        [Fact]
        public void AddPartyRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddPartyRegularTest")
                .Options;

            Country country = new Country { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
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

        [Fact]
        public void AddResultRegularTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddResultRegularTest")
                .Options;

            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO" };
            ElectionType electionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election" };
            Election election = new Election() { Country = country, ElectionType = electionType, Year = 2018 };
            County county = new County { Country = country, CountyId = 1, Name = "Akershus" };
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
    }
}
