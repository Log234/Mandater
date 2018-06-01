import { ComputationSets } from "../interfaces/ComputationSets";
import { DecomposedTable } from "../interfaces/DecomposedTable";
import { PresentationType } from "../types/PresentationType";
import { LagueDhontDistributionResult } from "./AlgorithmUtils";

export class LagueDhontSets implements ComputationSets {
    partyCodes: string[];
    partyNames: string[];
    districts: string[];
    votesPerDistrict: DecomposedTable<number>;
    percentPerDistrict: DecomposedTable<number>;
    districtSeatsPerDistrict: DecomposedTable<number>;
    districtTables: { [id: string]: LagueDhontDistributionResult };
    levelingSeatsTables: LagueDhontDistributionResult;

    constructor() {
        this.partyCodes = [];
        this.partyNames = [];
        this.districts = [];
        this.votesPerDistrict = { header: [], rowId: [], body: [] };
        this.percentPerDistrict = { header: [], rowId: [], body: [] };
        this.districtSeatsPerDistrict = { header: [], rowId: [], body: [] };
        this.districtTables = {};
        this.levelingSeatsTables = {
            partyIndex: {},
            quotientsPerSeat: { header: [], rowId: [], body: [] },
            winnerPerSeat: { header: [], rowId: [], body: [] },
            seatsWonByParty: { header: [], rowId: [], body: [] }
        };
    }

    getPresentationTypes(): PresentationType[] {
        return [
            PresentationType.DistrictTable,
            PresentationType.ElectionTable,
            PresentationType.SeatsPerParty
        ];
    }

    getTable(tableType: PresentationType, district?: string): DecomposedTable<number> {
        switch (tableType) {
            case PresentationType.DistrictTable:
                return this.districtSeatsPerDistrict;
            case PresentationType.ElectionTable:
                return this.createElectionTable();
            case PresentationType.SeatsPerParty:
                return this.districtSeatsPerDistrict;
            default:
                return {
                    header: [],
                    rowId: [],
                    body: []
                }
        }
    }

    createElectionTable() {
        const electionTable: DecomposedTable<number> =
            {
                header: ["Parti", "Stemmer", "%", "Distrikt", "Utjevning", "Sum"],
                rowId: [],
                body: []
            }
        const curVotes: { [id: string]: number } = {};
        const districtSeats: { [id: string]: number } = {};
        let totalVotes = 0;
        for (let i = 0; i < this.districts.length; i++) {
            for (let j = 0; j < this.votesPerDistrict.body[i].length; j++) {
                const index = j + 1;
                if (curVotes[this.votesPerDistrict.header[index]] === undefined) {
                    curVotes[this.votesPerDistrict.header[index]] = 0;
                    districtSeats[this.districtSeatsPerDistrict.header[index]] = 0;
                }
                curVotes[this.districtSeatsPerDistrict.header[index]] += this.votesPerDistrict.body[i][j];
                totalVotes += this.votesPerDistrict.body[i][j];
                districtSeats[this.districtSeatsPerDistrict.header[index]] += this.districtSeatsPerDistrict.body[i][
                    j];
            }
        }

        for (let partyCode of this.partyCodes) {
            electionTable.rowId.push(partyCode);
            const row: number[] = Array(electionTable.header.length - 1).fill(0);
            row[0] = curVotes[partyCode];
            row[1] = (curVotes[partyCode] / totalVotes) * 100;
            row[2] = districtSeats[partyCode];
            if (this.levelingSeatsTables.partyIndex[partyCode] === undefined) {
                row[3] = 0;
            } else {
                row[3] =
                    this.levelingSeatsTables.seatsWonByParty.body[0][this.levelingSeatsTables.partyIndex[
                    partyCode]];
            }
            row[4] = row[3] + row[2];

            electionTable.body.push(row);
        }
        return electionTable;
    }
}