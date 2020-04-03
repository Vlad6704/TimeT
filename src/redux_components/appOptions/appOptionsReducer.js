const initialState = {
    timeShift:7,
    firstDayOfTheWeek:1,
};

const appOptionsReducer = (appOptions = initialState, action) => {
    switch (action.type) {

        default:
            return appOptions;

    }
}

export default appOptionsReducer;