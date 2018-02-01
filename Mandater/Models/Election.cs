using System.ComponentModel.DataAnnotations;
using Mandater.Data;

namespace Mandater.Models
{
    public class Election : IElection
    {
        [Key] public int Year { get; }
        public ElectionType ElectionType { get; }
    }
}
