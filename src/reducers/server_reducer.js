import { server_actions } from '../actions'
const { SERVER_START, SERVER_STOP } = server_actions

const INITIAL_STATE = { ip: null, listening: false, port: 3000 }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SERVER_STOP:
      return { ...state, listening: false }
    case SERVER_START:
      return { ...state, ip: action.payload.ip, listening: true, port: action.payload.port }
    default:
      return state
  }
}
