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
        public void AddCountryTest()
        {
            DbContextOptions<ElectionContext> options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddCountryTest")
                .Options;

            // Testing regular single add
            Country country = new Country() {Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>()};
            ElectionType type1 = new ElectionType() {Country = country, Name = "Stortingsvalg", InternationalName = "Parliamentary election", Elections = new List<Election>()};
            country.ElectionTypes.Add(type1);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Equal(1, context.Countries.Count());
                Assert.Equal(country, context.Countries.Single());
            }

            // Testing adding duplicate country
            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Equal(1, context.Countries.Count());
                Assert.Equal(country, context.Countries.Single());
            }

            // Testing merging two versions of the same country
            Country country2 = new Country() { Name = "Norge", InternationalName = "Norway", ShortName = "NO", ElectionTypes = new List<ElectionType>() };
            ElectionType type2 = new ElectionType() { Country = country, Name = "Fylkesvalg", InternationalName = "Local election", Elections = new List<Election>() };
            country2.ElectionTypes.Add(type2);
            country2.ElectionTypes.Add(type1);

            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                repository.AddCountry(country2);
            }

            using (ElectionContext context = new ElectionContext(options))
            {
                Assert.Equal(1, context.Countries.Count());
                Assert.Equal(2, context.Countries.Single().ElectionTypes.Count);
                Assert.Contains(type1, context.Countries.Single().ElectionTypes);
                Assert.Contains(type2, context.Countries.Single().ElectionTypes);
            }

            // Testing adding a conflicting entry
            Country conflictCountry = new Country() {Name = "FEIL", InternationalName = "Norway", ShortName = "EN", ElectionTypes = new List<ElectionType>()};
            using (ElectionContext context = new ElectionContext(options))
            {
                ElectionRepository repository = new ElectionRepository(context);
                Assert.Throws<ArgumentException>(() => repository.AddCountry(conflictCountry));
            }
        }
    }
}
