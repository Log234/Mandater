using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Models;
using Microsoft.EntityFrameworkCore;

namespace Mandater.Repository
{
    public class ElectionContext: DbContext
    {
        public DbSet<Country> Countries { get; set; }
        public DbSet<County> Counties { get; set; }
        public DbSet<CountyData> CountyData { get; set; }
        public DbSet<ElectionType> ElectionTypes { get; set; }
        public DbSet<Election> Elections { get; set; }
        public DbSet<Party> Parties { get; set; }
        public DbSet<Result> Results { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<County>()
                .HasKey(c => new {c.CountryId, c.Name});
            modelBuilder.Entity<Election>()
                .HasKey(e => new {e.CountryId, e.ElectionTypeId, e.Year});
            modelBuilder.Entity<ElectionType>()
                .HasKey(eT => new {eT.CountryId, eT.InternationalName});
            modelBuilder.Entity<Party>()
                .HasKey(p => new {p.CountryId, p.Name});
            modelBuilder.Entity<Result>()
                .HasKey(r => new {r.ElectionId, r.PartyId, r.CountyId});
            modelBuilder.Entity<CountyData>()
                .HasKey(cD => new {cD.CountyId, cD.Year});
        }

        public ElectionContext()
        {
        }

        public ElectionContext(DbContextOptions<ElectionContext> options) : base(options)
        { }
    }
}
