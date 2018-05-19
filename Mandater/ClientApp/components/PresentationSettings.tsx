import * as React from "react";
//import { ElectionAlgorithm } from '../logic/Algorithm'; // @Edvarda trengs for Algorithms
//import { Election } from 'ClientApp/interfaces/Election'; // @Edvarda trengs for Algorithms
//import { ElectionType } from 'ClientApp/interfaces/ElectionType'; // @Edvarda trengs for Algorithms
// @Edvarda trengs for axios på typescript

export class PresentationSettings extends React.Component<{}, {}> {
    // @Edvarda: Dette er et eksempel på hvordan man får ut data for øyeblikket -- det blir enklere etter møtet på onsdag
    public componentWillMount() {

        //axios.get("http://mandater-testing.azurewebsites.net/api/v1.0.0/no?deep=true")
        //    .then(res => {
        //        let electionType: ElectionType = res.data[0];
        //        let election: Election = electionType.elections[electionType.elections.length-1];
        //        if (electionType == null) {
        //            console.log(electionType + " is an invalid election");
        //        } else {
        //            let definitelyAnElection: Election = election;
        //            let test: ElectionAlgorithm = new ElectionAlgorithm(definitelyAnElection);
        //            test.firstDivisor = 1.4;
        //            console.log(test.SainteLague());
        //        }
        //    }).catch(error => {
        //        console.log(error);
        //    });
    }
    public render() {
        return <div className="presentation-settings">
            <h2>Presentasjonsinnstillinger</h2>
            <form>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">År</label>
                    <div className="col-sm-7">
                        <select className="form-control" name="year">
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Beregningsmetode</label>
                    <div className="col-sm-7">
                        <select className="form-control" name="calcMethod">
                            <option value="SL">Sainte Lagues</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="firstDivisor" className="col-sm-5 col-form-label">Første delingstall</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="firstDivisor" type="number" name="firstDivisor" placeholder="1.0" min="1.0" step="0.1" max="5.0" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="electionThreshold" className="col-sm-5 col-form-label">Sperregrense</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="electionThreshold" type="number" name="electionThreshold" placeholder="1.4" min="0.0" step="0.1" max="15.0" />
                    </div>
                </div>
                <div className="form-group row">
                    { /*Utjevningsmandat = Leveling seat as of https://www.dinordbok.no/norsk-engelsk/?q=utjevningsmandat */
                    }
                    <label htmlFor="levelingSeat" className="col-sm-5 col-form-label">Utjevningsmandater</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="levelingSeat" type="number" name="levelingSeat" placeholder="1.4" min="0.0" step="0.1" max="15.0" />
                    </div>
                </div>
            </form>
        </div>;

    }
}