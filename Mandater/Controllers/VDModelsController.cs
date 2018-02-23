﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mandater.Models;
using Mandater.Repository;

namespace Mandater.Controllers
{
    [Produces("application/json")]
    [Route("api/v0.1.0/no/2017/")]
    public class VDModelsController : Controller
    {
        private readonly VDContext _context;

        public VDModelsController(VDContext context)
        {
            _context = context;
        }

        // GET: api/v0.1.0/no/2017/
        [HttpGet]
        public IEnumerable<VDModel> GetVDModels()
        {
            return _context.VDModels;
        }
    }
}