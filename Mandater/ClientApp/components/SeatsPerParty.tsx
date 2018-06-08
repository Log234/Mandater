import { PartyResult } from "../interfaces/PartyResult";
import * as React from "react";
import { VictoryChart, VictoryBar } from "victory";

export interface SeatsPerPartyProps {
    showPartiesWithoutSeats: boolean;
    partyResults: PartyResult[];
}

export class SeatsPerParty extends React.Component<SeatsPerPartyProps, {}> {
    /**
     * Takes raw data from property/properties, and converts them to more
     * presentable things.
     */
    getData() {
        if (this.props.showPartiesWithoutSeats) {
            return this.props.partyResults;
        } else {
            return this.props.partyResults.filter(
                party => party.totalSeats > 0
            );
        }
    }

    render() {
        return (
            <VictoryChart animate={false} domainPadding={{ x: 20 }}>
                <VictoryBar
                    animate={{ duration: 666 }}
                    data={this.getData().sort((a, b) => {
                        return b.totalSeats - a.totalSeats;
                    })}
                    sortKey="t"
                    x="partyCode"
                    y="totalSeats"
                />
            </VictoryChart>
        );
    }
}
