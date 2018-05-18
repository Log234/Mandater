export enum TableMode {
    DistrictOverview = "DISTRICT_OVERVIEW",
    ElectionOverview = "ELECTION_OVERVIEW"
}

export interface TableState {
    tableMode: TableMode,
}