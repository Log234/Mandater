using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Models;
using Mandater.Repository;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Mandater
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IWebHost host = BuildWebHost(args);
            using (IServiceScope scope = host.Services.CreateScope())
            {
                IServiceProvider services = scope.ServiceProvider;
                try
                {
                    //VDContext context = services.GetRequiredService<VDContext>();
                    //VDInitializer.Initialize(context);
                    ElectionContext context = services.GetRequiredService<ElectionContext>();
                    ILogger logger = services.GetRequiredService <ILogger<Program>>();
                    ElectionInitializer.Initialize(context, logger);
                }
                catch (Exception ex)
                {
                    ILogger logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding VDContext");
                }
            }
            host.Run();
        }

        private static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}
