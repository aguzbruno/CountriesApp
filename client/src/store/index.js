import {createStore,applyMiddleware } from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootRedcucer from "../reducer"

export const store = createStore(rootRedcucer, composeWithDevTools(applyMiddleware(thunk)))
