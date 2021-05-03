import * as constants from "./constants";

export const getSummaryDetails = () => {
    return fetch(constants.summaryDetailsUrl).then(result => result.json());
};
export const getInActiveDetails = () => {
    return fetch(constants.getInactiveGaugeDetails).then(result =>
        result.json()
    );
};
export const getHistoryDetails = id => {
    const historyDetailsUrl = constants.historyDetailsUrl + id;
    return fetch(historyDetailsUrl).then(result => result.json());
};
export const getInstrumentNames = () => {
    return fetch(constants.getInstrumentNamesUrl).then(result => result.json());
};
export const getInstrumentId = instrName => {
    const getInstrumentIdUrl = constants.getInstrumentIdUrl + instrName;
    return fetch(getInstrumentIdUrl).then(result => result.json());
};

export const getInactiveDetails = () => {
    return fetch(constants.getInactiveGaugeDetails).then(result =>
        result.json()
    );
};
