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
        public DbSet<IElection> Elections { get; set; }
        public DbSet<IResult> Results { get; set; }
    }
}
