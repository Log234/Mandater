using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mandater.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}