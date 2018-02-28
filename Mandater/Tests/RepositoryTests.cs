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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };

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

        [Fact]
        public void AddCountryDuplicateTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountryDuplicateTest")
                .Options;

            // Testing adding duplicate country
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };
            ElectionType type1 = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election", Elections = new List<Election>() };
            country.ElectionTypes.Add(type1);

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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }
            
            Country conflictCountry = new Country() { Name = "FEIL", InternationalName = "Norway", ShortName = "EN", ElectionTypes = new List<ElectionType>() };
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

            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };
            ElectionType electionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election", Elections = new List<Election>() };

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
                repository.AddElectionType(electionType);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Single(context.Countries);
                Assert.Single(context.ElectionTypes);
                Assert.Equal(country.CountryId, context.ElectionTypes.Single().CountryId);
                Assert.Equal(electionType.CountryId, context.ElectionTypes.Single().CountryId);
                Assert.Equal(electionType.Name, context.ElectionTypes.Single().Name);
                Assert.Equal(electionType.InternationalName, context.ElectionTypes.Single().InternationalName);
            }
        }

        [Fact]
        public void AddElectionTypeNewCountryTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTypeNewCountryTest")
                .Options;

            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };
            ElectionType electionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election", Elections = new List<Election>() };

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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };
            ElectionType electionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election", Elections = new List<Election>() };

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
            Country country = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };
            ElectionType type1 = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election", Elections = new List<Election>() };
            country.ElectionTypes.Add(type1);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            ElectionType conflictElectionType = new ElectionType() { Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election2", Elections = new List<Election>() };
            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<InvalidOperationException> (() => repository.AddElectionType(conflictElectionType));
            }
        }
    }
}
