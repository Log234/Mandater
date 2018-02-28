using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mandater.Models
{
    public class County
    {
        public int CountyId { get; set; }
        [Required]
        public int Name { get; set; }

        public int CountryId { get; set; } = -1;
        [Required]
        public virtual Country Country { get; set; }

        public virtual List<CountyData> CountyData { get; set; }
        
    }
}