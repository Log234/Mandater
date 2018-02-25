using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Models;

namespace Mandater.Repository
{
    public class VDContext : DbContext
    {
        public VDContext() { }
        public VDContext(DbContextOptions<VDContext> options) : base(options) { }
        public DbSet<VDModel> VDModels { get; set; }
    }
}
