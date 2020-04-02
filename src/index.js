import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {createStore , applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux_components/reducer';
import ErrorBoundry from './components/error-boundry/error-boundry';
import {ProviderService} from './components/service-context/service-context';
import DataStoreService from './services/service';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(
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
