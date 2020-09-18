import React, { Component } from 'react';
import Routes from './routes';
import "./config/StatusBarConfig";

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import peopleReducer from "./reduxStore/reducers/pokeReducer";
import pokeReducer from './reduxStore/reducers/pokeReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(pokeReducer);

//const App = () => <Routes />;

//export default App;

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
         
    }
}