using System;
using System.Collections.Generic;
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
        /// Default path method that returns a shallow Country object, showing which countries the API has data on.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Country> GetCountries()
        {
            return _context
                .Countries;
        }

        [HttpGet("{countryCode}")]
        public IEnumerable<ElectionType> GetElectionTypes(string countryCode)
        {
            return _context
                .Countries
                .Include(c => c.ElectionTypes)
                .First(c => c.CountryCode == countryCode.ToUpper())
                .ElectionTypes;
        }

        [HttpGet("{countryCode}/{electionCode}")]
        public IEnumerable<Election> GetElections(string countryCode, string electionCode)
        {
            return _context
                .Countries
                .Include(c => c.ElectionTypes)
                .ThenInclude(c => c.Elections)
                .First(c => c.CountryCode == countryCode.ToUpper())
                .ElectionTypes
                .First(c => c.InternationalName == Utilities.ETNameUtilities.CodeToName(electionCode))
                .Elections;
        }
    }
}