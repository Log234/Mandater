using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Models
{
    public class CountyData
    {
        public int CountyDataId { get; set; }

        public int Year { get; set; } = -1;
        public int Population { get; set; } = -1;
        public double Areal { get; set; } = double.NaN;

        public int CountyId { get; set; }
        [Required]
        public County County { get; set; }
    }
}
