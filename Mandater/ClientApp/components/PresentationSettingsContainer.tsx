import * as React from 'react';
import { PresentationSelection } from './PresentationSelection';
import { PresentationSettings } from './PresentationSettings';

export class PresentationSettingsContainer extends React.Component<{}, {}> {
    public render() {
        return <div className="presentation-settings-container">
            <PresentationSelection />
            <PresentationSettings />
        </div>

    }
}