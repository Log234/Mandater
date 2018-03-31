using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Data;
using Mandater.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Mandater.Controllers
{
    [EnableCors("CorsPolicy")]
    [Produces("application/json")]
    [Route("api/v1.0.0/")]
    public class ElectionController : Controller
    {
        private readonly ElectionContext _context;
        private readonly ILogger _logger;
        public ElectionController(ElectionContext context, ILogger<ElectionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Default path method that returns a list of shallow Country objects, showing which countries the API has data on.
        /// If deep is specified it returns all data.
        /// </summary>
        /// <returns>List of countries</returns>
        [HttpGet("{deep?}")]
        public IEnumerable<Country> GetCountries(bool deep = false)
        {
            if (deep)
            {
                return _context.Countries
                        .Include(c => c.ElectionTypes)
                            .ThenInclude(c => c.Elections)
                                .ThenInclude(c => c.Results)
                        .Include(c => c.ElectionTypes)
                            .ThenInclude(c => c.Elections)
                                .ThenInclude(c => c.CountyData);
            }
            return _context.Countries;
        }
        
        /// <summary>
        /// Default path method that returns a list of shallow ElectionType objects, showing which election types for the specified country the API has data on.
        /// </summary>
        /// <returns>List of election types</returns>
        [HttpGet("{countryCode}")]
        public IEnumerable<ElectionType> GetElectionTypes(string countryCode)
        {
            return _context.Countries
                    .Include(c => c.ElectionTypes)
                    .First(c => c.CountryCode == countryCode.ToUpper())
                    .ElectionTypes;
        }

        /// <summary>
        /// Default path method that returns a list of shallow election objects, showing which elections for the specified country and election type the API has data on.
        /// </summary>
        /// <returns>List of elections</returns>
        [HttpGet("{countryCode}/{electionCode}")]
        public IEnumerable<Election> GetElections(string countryCode, string electionCode)
        {
            return _context.Countries
                    .Include(c => c.ElectionTypes)
                        .ThenInclude(c => c.Elections)
                    .First(c => c.CountryCode == countryCode.ToUpper())
                    .ElectionTypes
                        .First(c => c.InternationalName == Utilities.ETNameUtilities.CodeToName(electionCode))
                        .Elections;
        }

        /// <summary>
        /// Default path method that returns a list of Result objects, showing which Results for the specified election the API has data on.
        /// </summary>
        /// <returns>List of results</returns>
        [HttpGet("{countryCode}/{electionCode}/{year}")]
        public IEnumerable<Result> GetResults(string countryCode, string electionCode, int year)
        {
            return _context.Countries
                    .Include(c => c.ElectionTypes)
                        .ThenInclude(c => c.Elections)
                            .ThenInclude(c => c.Results)
                    .First(c => c.CountryCode == countryCode.ToUpper())
                    .ElectionTypes
                        .First(c => c.InternationalName == Utilities.ETNameUtilities.CodeToName(electionCode))
                        .Elections
                            .First(c => c.Year == year)
                            .Results;
        }

    }
}