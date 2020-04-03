import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {createStore , applyMiddleware, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux_components/reducer';
import fileSystemReduser from "./redux_components/fileSystem/fileSystemReduser";
import tasksReducer from "./redux_components/tasks/tasksReducer";
import ongoingTasksReducer from "./redux_components/ongoingTasks/ongoingTasksReducer";
import appOptionsReducer from "./redux_components/appOptions/appOptionsReducer";
import statisticsReducer from "./redux_components/statistics/statisticsReducer";
import ErrorBoundry from './components/error-boundry/error-boundry';
import {ProviderService} from './components/service-context/service-context';
import DataStoreService from './services/service';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const rootReducer = combineReducers({tasks : tasksReducer, fileSystem: fileSystemReduser, ongoingTasks: ongoingTasksReducer,appOptions: appOptionsReducer, statistics: statisticsReducer});
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
));
const dataStoreService = new DataStoreService();

ReactDOM.render(
    <Provider store = {store}>
        <ErrorBoundry>
            <ProviderService value = {dataStoreService}>
                <App />
            </ProviderService>
        </ErrorBoundry>
    </Provider>    , document.getElementById('root'));
