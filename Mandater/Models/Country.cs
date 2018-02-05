﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public class Country
    {
        [Key]
        public string Name { get; set; }
        [Required]
        public string InternationalName { get; set; }
        [Required]
        public string ShortName { get; set; }
        [Required]
        public virtual List<ElectionType> ElectionTypes { get; set; }
    }
}
