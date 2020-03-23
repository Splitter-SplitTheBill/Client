import {
    combineReducers
} from 'redux'
import cameraReducer from './cameraReducer'
import eventReducer from './eventReducer'
import friendsReducer from './friendsReducer'

const reducers = combineReducers({
    cameraReducer,
    eventReducer,
    friendsReducer
  })

export default reducers