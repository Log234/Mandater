using Mandater.Data;
using Mandater.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mandater.Utilities
{
    public static class ModelBuilderUtilities
    {
        /// <summary>
        /// Constructs a series of results, counties and parties for an election based on an array of VDModels,
        /// checks that the models are valid and adds them to the context.
        /// </summary>
        /// <param name="context">The context where the resulting models should be added.</param>
        /// <param name="election">The election that the results should be connected to.</param>
        /// <param name="entities">The data on which the models should be built.</param>
        /// <param name="validationSet">A set of already checked models.</param>
        public static void ResultModelBuilder(ElectionContext context, Election election, VDModel[] entities, HashSet<int> validationSet)
        {
            foreach (VDModel entity in entities)
            {
                County county = context.Counties.Find(election.CountryId, entity.Fylkenavn);
                if (county == null)
                {
                    county = new County
                    {
                        CountryId = election.CountryId,
                        Name = entity.Fylkenavn
                    };
                    CustomValidation.ValidateCounty(county, validationSet);
                    context.Counties.Add(county);
                }

                Party party = context.Parties.Find(election.CountryId, entity.Partinavn);
                if (party == null)
                {
                    party = new Party
                    {
                        CountryId = election.CountryId,
                        Name = entity.Partinavn,
                        ShortName = entity.Partikode
                    };
                    CustomValidation.ValidateParty(party, validationSet);
                    context.Parties.Add(party);
                }

                if (!double.TryParse(entity.OppslutningProsentvis, out double percentage))
                {
                    throw new ArgumentException($"{entity.Fylkenavn} - {entity.Partinavn} has an invalid percentage which could not be parsed.");
                }
                if (!int.TryParse(entity.AntallStemmerTotalt, out int votes))
                {
                    throw new ArgumentException($"{entity.Fylkenavn} - {entity.Partinavn} has an invalid total number of votes which could not be parsed.");
                }

                Result result = new Result
                {
                    CountyId = county.CountyId,
                    ElectionId = election.ElectionId,
                    PartyId = party.PartyId,
                    Percentage = percentage,
                    Votes = votes
                };
                CustomValidation.ValidateResult(result, validationSet);
                election.Results.Add(result);
                context.Results.Add(result);
                context.SaveChanges();
            }
        }
    }
}
