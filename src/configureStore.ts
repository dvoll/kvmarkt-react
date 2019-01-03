import { applyMiddleware, compose, createStore, Store } from 'redux'
// import createSagaMiddleware from 'redux-saga'
// `react-router-redux` is deprecated, so we use `connected-react-router`.
// This provides a Redux middleware which connects to our `react-router` instance.
// import { connectRouter, routerMiddleware } from 'connected-react-router'
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
// import { composeWithDevTools } from 'redux-devtools-extension'
// If you use react-router, don't forget to pass in your history type.
// import { History } from 'history'

// Import the state interface and our combined reducers/sagas.
import { createEpicMiddleware } from 'redux-observable';
import { ApplicationState, rootEpic, rootReducer } from './store'


const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(
    // history: History,
    initialState?: ApplicationState
): Store<ApplicationState> {
    // create the composing function for our middlewares
    // const composeEnhancers = composeWithDevTools({})
    // create the redux-saga middleware
    // const sagaMiddleware = createSagaMiddleware()

    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.
    const store = createStore(
        rootReducer, 
        initialState, // composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)) // connectRouter(history)(rootReducer),
        composeEnhancers(
            applyMiddleware(epicMiddleware)
        )
    );

    epicMiddleware.run(rootEpic);

    // Don't forget to run the root saga, and return the store object.
    // sagaMiddleware.run(rootSaga)
    return store
}