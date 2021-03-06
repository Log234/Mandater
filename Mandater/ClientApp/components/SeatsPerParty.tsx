import { PartyResult } from "../interfaces/PartyResult";
import * as React from "react";
import { VictoryChart, VictoryBar } from "victory";

export interface SeatsPerPartyProps {
    partyResults: PartyResult[];
}

export class SeatsPerParty extends React.Component<SeatsPerPartyProps, {}> {
    render() {
        return (
            <VictoryChart animate={false} domainPadding={{ x: 20 }}>
                <VictoryBar
                    animate={{
                        duration: 200,
                        onEntry: {
                            duration: 800
                        },
                        onLoad: {
                            duration: 800
                        },
                        onExit: { duration: 800 }
                    }}
                    data={this.props.partyResults.sort((a, b) => {
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
