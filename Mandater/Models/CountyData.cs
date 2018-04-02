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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CountyDataId { get; set; }

        public int Year { get; set; } = -1;
        public int Population { get; set; } = -1;
        public double Areal { get; set; } = double.NaN;
        public int Seats { get; set; } = -1;

        public int CountyId { get; set; }
    }
}
