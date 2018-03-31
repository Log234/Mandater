using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Mandater
{
    public class Startup
    {
        IHostingEnvironment _env;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            // Swagger generation with default settings
            services.AddSwaggerGen(options =>
            {
                var xmlDocFile = Path.Combine(AppContext.BaseDirectory, $"{_env.ApplicationName}.xml");
                if (File.Exists(xmlDocFile))
                {
                    options.IncludeXmlComments(xmlDocFile);
                }
                options.SwaggerDoc("v1.0.0", new Info {
                    Title = "API for election result data",
                    Version = "v1.0.0",
                    Description = "This API provides the back-end for calculating seats and data for the Mandater project." });
            });
            services.AddMvc();
            SetUpDatabase(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ElectionContext context)
        {
            _env = env;
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    ReactHotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseSwagger(options =>
            {
                
            });
            app.UseSwaggerUI(options =>
            {
                //options.SwaggerEndpoint("/swagger/v0.1.0/swagger.json", "API for election result data");
                options.SwaggerEndpoint("/swagger/v1.0.0/swagger.json", "API for election result data");
            });
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }

        public void SetUpDatabase(IServiceCollection services)
        {
            //services.AddDbContext<VDContext>(options => options.UseInMemoryDatabase("Testing"));
            services.AddDbContext<ElectionContext>(options => options.UseInMemoryDatabase("ModelDB"));
        }
    }
}
