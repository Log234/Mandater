using System;
using System.Linq;

namespace Mandater.Utilities
{
    public enum Algorithm
    {
        Undefined = 0,
        ModifiedSainteLagues,
        SainteLagues,
        DHondt
    }

    public class AlgorithmUtilities
    {
        // Our internal textual representations of the algorithm names
        private const string modifiedSainteLagues = "Sainte Laguës (modified)";
        private const string sainteLagues = "Sainte Laguës";
        private const string dHondt = "d'Hondt";

        // Our accepted names for the different algorithms
        private static readonly string[] ModifiedSainteLaguesSet = {modifiedSainteLagues};
        private static readonly string[] SainteLaguesSet = {sainteLagues};
        private static readonly string[] DHondtSet = {dHondt};

        /// <summary>
        /// Accepts a string and returns the matching algorithm enum.
        /// If no matching enum can be found it throws an ArgumentException.
        /// </summary>
        /// <param name="name">The name of the algorithm to be converted.</param>
        /// <returns>An algorithm enum</returns>
        public static Algorithm StringToAlgorithm(string name)
        {
            if (ModifiedSainteLaguesSet.Contains(name))
            {
                return Algorithm.ModifiedSainteLagues;
            }

            if (SainteLaguesSet.Contains(name))
            {
                return Algorithm.SainteLagues;
            }

            if (DHondtSet.Contains(name))
            {
                return Algorithm.DHondt;
            }

            throw new ArgumentException($"{name} is not a valid algorithm name.");
        }

        /// <summary>
        /// Accepts an algorithm enum and returns our internal textual representation of that algorithm.
        /// If there is not any known textual representation of it an ArgumentException is thrown.
        /// </summary>
        /// <param name="algorithm">The Algorithm enum to be converted.</param>
        /// <returns>The name of the algorithm enum</returns>
        public static string AlgorithmToString(Algorithm algorithm)
        {
            switch (algorithm)
            {
                case Algorithm.ModifiedSainteLagues:
                    return modifiedSainteLagues;
                case Algorithm.SainteLagues:
                    return sainteLagues;
                case Algorithm.DHondt:
                    return dHondt;
                default:
                    throw new ArgumentException($"{algorithm} does not have a string name.");
            }
        }

        /// <summary>
        /// Checks whether the name matches any algorithm we know.
        /// </summary>
        /// <param name="name">The name of the algorithm.</param>
        /// <returns>True if we have an enum for the algorithm, false otherwise.</returns>
        public static bool IsAlgorithm(string name)
        {
            return ModifiedSainteLaguesSet.Contains(name)
                   || SainteLaguesSet.Contains(name)
                   || DHondtSet.Contains(name);
        }

        /// <summary>
        /// Attempts to convert the name to an algorithm.
        /// If it is successful it returns true and pushes the Algorithm to the algorithm variable.
        /// Otherwise it returns false and pushes Algorithm.Undefined to the algorithm variable.
        /// </summary>
        /// <param name="name">The name of the algorithm.</param>
        /// <param name="algorithm">Where the algorithm should be returned.</param>
        /// <returns>True if successful, false otherwise.</returns>
        public static bool TryParse(string name, out Algorithm algorithm)
        {
            if (IsAlgorithm(name))
            {
                algorithm = StringToAlgorithm(name);
                return true;
            }

            algorithm = Algorithm.Undefined;
            return false;
        }
    }
}
