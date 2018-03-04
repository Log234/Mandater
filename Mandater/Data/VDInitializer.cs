using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Repository;
using Microsoft.EntityFrameworkCore;
using Mandater.Utilities;
using Mandater.Models;

namespace Mandater.Data
{
    public static class VDInitializer
    {
        public static void Initialize(VDContext context)
        {
            context.Database.EnsureCreated();
            if (!context.VDModels.Any())
            {
                VDModel[] entities = CSVUtilities.CsvToVdArray("Data/States/NO/ParliamentaryElection/2018-02-10_partifordeling_1_st_2017.csv");
                context.VDModels.AddRange(entities);
                context.SaveChanges();
            }
            
        }
    }
}
