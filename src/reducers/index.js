import { combineReducers } from 'redux'
import drawer_reducer from './drawer_reducer'
import server_reducer from './server_reducer'
import settings_reducer from './settings_reducer'
import sounds_reducer from './sounds_reducer'
import theme_reducer from './theme_reducer'

const root_reducer = combineReducers({
  state: (state = {}) => state,
  drawer: drawer_reducer,
  server: server_reducer,
  settings: settings_reducer,
  sounds: sounds_reducer,
  theme: theme_reducer
})

export default root_reducer
