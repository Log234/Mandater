import { ApplicationState } from "./store";
import { unloadedState as computationState } from "./states/ComputationState";
import { unloadedState as settingsState } from "./states/SettingsState";
import { unloadedState as requestedDataState } from "./states/RequestedDataState";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: ApplicationState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
        console.log(`State saved`);
    } catch (err) {
        console.error(err);
    }
};