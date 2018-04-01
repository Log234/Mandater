using Mandater.Models;
using Microsoft.EntityFrameworkCore;

namespace Mandater.Data
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
            modelBuilder.Entity<Country>()
                .HasKey(c => c.CountryCode);
            modelBuilder.Entity<Country>()
                .HasAlternateKey(c => c.CountryId);
            modelBuilder.Entity<County>()
                .HasKey(c => new {c.CountryId, c.Name});
            modelBuilder.Entity<County>()
                .HasAlternateKey(c => c.CountyId);
            modelBuilder.Entity<Election>()
                .HasKey(e => new {e.CountryId, e.ElectionTypeId, e.Year});
            modelBuilder.Entity<Election>()
                .HasAlternateKey(e => e.ElectionId);
            modelBuilder.Entity<ElectionType>()
                .HasKey(eT => new {eT.CountryId, eT.InternationalName});
            modelBuilder.Entity<ElectionType>()
                .HasAlternateKey(eT => eT.ElectionTypeId);
            modelBuilder.Entity<Party>()
                .HasKey(p => new {p.CountryId, p.Name});
            modelBuilder.Entity<Party>()
                .HasAlternateKey(p => p.PartyId);
            modelBuilder.Entity<Result>()
                .HasKey(r => new {r.ElectionId, r.PartyId, r.CountyId});
            modelBuilder.Entity<Result>()
                .HasAlternateKey(r => r.ResultId);
            modelBuilder.Entity<CountyData>()
                .HasKey(cD => new {cD.CountyId, cD.Year});
            modelBuilder.Entity<CountyData>()
                .HasAlternateKey(cD => cD.CountyDataId);
        }

        public ElectionContext()
        {
        }

        public ElectionContext(DbContextOptions<ElectionContext> options) : base(options)
        { }
    }
}
