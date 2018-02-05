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
        public DbSet<Election> Elections { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<Party> Parties { get; set; }

        public ElectionContext()
        { }

        public ElectionContext(DbContextOptions<ElectionContext> options): base(options)
        { }
    }
}
