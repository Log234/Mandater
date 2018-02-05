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
        public void AddPartyTest()
        {
            var options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddPartyTest")
                .Options;

            var party = new Party { Name = "Testpartiet", ShortName = "Tp" };

            using (var context = new ElectionContext(options))
            {
                var repository = new ElectionRepository(context);

                repository.AddParty(party);
            }

            using (var context = new ElectionContext(options))
            {
                Assert.Equal(1, context.Parties.Count());
                Assert.Equal(party.Name, context.Parties.Single().Name);
            }
        }

        [Fact]
        public void AddElectionTest()
        {
            var options = new DbContextOptionsBuilder<ElectionContext>()
                .UseInMemoryDatabase(databaseName: "AddElectionTest")
                .Options;

            var party1 = new Party { Name = "Testparti1", ShortName = "Tp1" };
            var party2 = new Party { Name = "Testparti2", ShortName = "Tp2" };

            var election = new Election { ElectionType = ElectionType.Parliamentary, Year = 2018 };
            var result1 = new Result { Election = election, Party = party1, Votes = 2034 };
            var result2 = new Result { Election = election, Party = party2, Votes = 1024 };
            election.Results = new List<Result>() { result1, result2 };

            using (var context = new ElectionContext(options))
            {
                var repository = new ElectionRepository(context);
                repository.AddElection(election);
            }

            using (var context = new ElectionContext(options))
            {
                Assert.Equal(2, context.Results.Count());
                Assert.Contains(result1, context.Results.ToList());
            }
        }
    }
}
