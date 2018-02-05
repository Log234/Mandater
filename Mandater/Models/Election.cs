using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Mandater.Data;

namespace Mandater.Models
{
    public class Election : IElection
    {
        public int ElectionId { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public ElectionType ElectionType { get; set; }

        public List<Result> Results { get; set; }
        
    }
}
