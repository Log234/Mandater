import * as React from 'react';
import { PresentationSelection } from './PresentationSelection';
import { PresentationSettings } from './PresentationSettings';

export class PresentationSettingsContainer extends React.Component<{}, {}> {
    public render() {
        // settings-menu contains the styling
        return <div className="presentation-settings-container settings-menu">
            <PresentationSelection />
            <PresentationSettings />
        </div>

    }
}