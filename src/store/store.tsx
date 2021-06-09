import {combineReducers, createStore} from 'redux'
import {userReducer} from './reducers'

const rootreducer = combineReducers({
    userReducer
})

const configureStore = createStore(rootreducer)

export default configureStore