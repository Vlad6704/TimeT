import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {createStore , applyMiddleware, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import fileSystemReducer from "./redux_components/fileSystem/fileSystemReducer";
import tasksReducer from "./redux_components/tasks/tasksReducer";
import ongoingTasksReducer from "./redux_components/ongoingTasks/ongoingTasksReducer";
import appOptionsReducer from "./redux_components/appOptions/appOptionsReducer";
import statisticsReducer from "./redux_components/statistics/statisticsReducer";
import authReducer from "./redux_components/auth/authReduser";
import ErrorBoundry from './components/errorBoundry/errorBoundry';
import {ProviderService} from './components/serviceContext/serviceContext';
import DataStoreService from './services/service';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware , ConnectedRouter  } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import './fonts/icon/style.css';
import './fonts/Roboto/roboto.css';
import './index.css';

const history = createBrowserHistory({ basename: '/timeT' });

const middleware = [thunk,routerMiddleware(history)];
const rootReducer = combineReducers({
    tasks : tasksReducer,
    fileSystem: fileSystemReducer,
    ongoingTasks: ongoingTasksReducer,
    appOptions: appOptionsReducer,
    statistics: statisticsReducer,
    user:authReducer,
    router: connectRouter(history),
});
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(...middleware),
    // other store enhancers if any
));
const dataStoreService = new DataStoreService();

ReactDOM.render(
    <Provider store = {store}>
        <ErrorBoundry>
            <ProviderService value = {dataStoreService}>
                <ConnectedRouter history={history}>
                    <App />
                </ConnectedRouter>
            </ProviderService>
        </ErrorBoundry>
    </Provider>    , document.getElementById('root'));
