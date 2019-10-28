import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux_components/reducer';
import ErrorBoundry from './components/error-boundry/error-boundry';
import {ProviderService} from './components/service-context/service-context';
import DataStoreService from './services/service'


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const dataSroreService = new DataStoreService();

ReactDOM.render(
    <Provider store = {store}>
        <ErrorBoundry>
            <ProviderService value = {dataSroreService}>
                <App />
            </ProviderService>
        </ErrorBoundry>
    </Provider>    , document.getElementById('root'));
