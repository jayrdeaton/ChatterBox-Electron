import { server_actions } from '../actions'
const { SERVER_START, SERVER_STOP } = server_actions

const INITIAL_STATE = { ip: null, listening: false, port: parseInt(localStorage.getItem('port') || 5000) }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SERVER_STOP:
      return { ...state, listening: false }
    case SERVER_START:
      localStorage.setItem('port', action.payload.port)
      return { ...state, ip: action.payload.ip, listening: true, port: action.payload.port }
    default:
      return state
  }
}
