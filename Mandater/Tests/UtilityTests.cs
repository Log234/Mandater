﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Mandater;
using Mandater.Models;

namespace Mandater.Tests
{
    public class UtilityTests
    {
        string filePath = "../../../Data/Countries/NO/ParliamentaryElection/2017.csv";
        string expectedHeaderString = "Fylkenummer;Fylkenavn;Kommunenummer;Kommunenavn;Stemmekretsnummer;Stemmekretsnavn;Partikode;Partinavn;Oppslutning prosentvis;Antall stemmeberettigede;Antall forhåndsstemmer;Antall valgtingstemmer;Antall stemmer totalt;Endring % siste tilsvarende valg;Endring % siste ekvivalente valg;Antall mandater;Antall utjevningsmandater;";
        [Fact]
        public void ReadFileTest()
        {
            StreamReader streamReader = new StreamReader(filePath);
            Assert.NotNull(streamReader);
        }

        [Fact]
        public void ReadHeadersTest()
        {
            StreamReader file = new StreamReader(filePath);
            string actualHeaderString = file.ReadLine();
            string lineToConvert = file.ReadLine();
            Assert.Equal(expectedHeaderString, actualHeaderString);
        }

        [Fact]
        public void ReadFirstObjectTest()
        {
            StreamReader file = new StreamReader(filePath);
            string actualHeaderString = file.ReadLine();
            string objectLine = file.ReadLine();
            string[] objectFields = objectLine.Split(";");
            VDModel vdModel = new VDModel
            {
                Fylkenummer = objectFields[0],
                Fylkenavn = objectFields[1],
                Kommunenummer = objectFields[2],
                Kommunenavn = objectFields[3],
                Stemmekretsnummer = objectFields[4],
                Stemmekretsnavn = objectFields[5],
                Partikode = objectFields[6],
                Partinavn = objectFields[7],
                OppslutningProsentvis = objectFields[8],
                AntallStemmeberettigede = objectFields[9],
                AntallForhåndsstemmer = objectFields[10],
                AntallValgtingstemmer = objectFields[11],
                AntallStemmerTotalt = objectFields[12],
                EndringProsentSisteTilsvarendeValg = objectFields[13],
                EndringProsentSisteEkvivalenteValg = objectFields[14],
                AntallMandater = objectFields[15],
                AntallUtjevningsmandater = objectFields[16]
            };
            Assert.Equal("Østfold", vdModel.Fylkenavn);
            Assert.Equal("3", vdModel.AntallMandater);
        }

        [Fact]
        public void ReadAllTest()
        {
            int expectedNumberOfVotes = 800947; // from VDs own site
            List<VDModel> objects = Utilities.CsvUtilities.CsvToList(filePath);
            List<VDModel> APResults = objects.FindAll(a => a.Partinavn == "Arbeiderpartiet");
            int actualNumberOfVotes = 0;
            foreach (VDModel element in APResults)
            {
                Int32.TryParse(element.AntallStemmerTotalt, out int stemmer);
                actualNumberOfVotes += stemmer;
            }
            Assert.Equal(expectedNumberOfVotes, actualNumberOfVotes);
        }
    }
}
