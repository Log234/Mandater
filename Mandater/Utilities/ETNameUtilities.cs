using System;
using System.Linq;

namespace Mandater.Utilities
{
    public class ETNameUtilities
    {
        // Our internal textual ElectionType IDs
        private const string PARLIAMENTARY_ELECTION_CODE = "pe";

        // Our printable ElectionType names
        private const string PARLIAMENTARY_ELECTION_NAME = "Parliamentary Election";

        // Our accepted names for the different algorithms
        private static readonly string[] ParliamentaryElectionSet = { PARLIAMENTARY_ELECTION_CODE.ToLower(), PARLIAMENTARY_ELECTION_NAME.ToLower(), "stortingsvalg" };

        /// <summary>
        /// Accepts a string and returns the matching ID.
        /// If no matching enum can be found it throws an ArgumentException.
        /// </summary>
        /// <param name="name">The name of the ElectionType ID.</param>
        /// <returns>An ID</returns>
        public static string NameToId(string name)
        {
            name = name.ToLower();

            if (ParliamentaryElectionSet.Contains(name))
            {
                return PARLIAMENTARY_ELECTION_CODE;
            }

            throw new ArgumentException($"{name} is not a valid ElectionType name.");
        }

        /// <summary>
        /// Accepts an ElectionType ID and returns the full name.
        /// If the ID is not recognized an ArgumentException is thrown.
        /// </summary>
        /// <param name="id">The ElectionType ID to be converted.</param>
        /// <returns>The full name of the ElectionType</returns>
        public static string IdToName(string id)
        {
            switch (id)
            {
                case PARLIAMENTARY_ELECTION_CODE:
                    return PARLIAMENTARY_ELECTION_NAME;
                default:
                    throw new ArgumentException($"{id} is not recognized.");
            }
        }

        /// <summary>
        /// Checks whether the name matches any ElectionType we know.
        /// </summary>
        /// <param name="name">The name of the ElectionType.</param>
        /// <returns>True if the name is in our dictionary, false otherwise.</returns>
        public static bool IsElectionType(string name)
        {
            return ParliamentaryElectionSet.Contains(name);
        }

        /// <summary>
        /// Attempts to convert the name to an ID.
        /// If it is successful it returns true and pushes the ID to the id variable.
        /// Otherwise it returns false and pushes null to the id variable.
        /// </summary>
        /// <param name="name">The name of the ElectionType.</param>
        /// <param name="id">Where the ID should be returned.</param>
        /// <returns>True if successful, false otherwise.</returns>
        public static bool TryParse(string name, out string id)
        {
            if (IsElectionType(name))
            {
                id = NameToId(name);
                return true;
            }

            id = null;
            return false;
        }
    }
}
