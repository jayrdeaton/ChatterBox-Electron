import { server_actions } from '../actions'
const { SERVER_START, SERVER_STOP } = server_actions

const INITIAL_STATE = { listening: false, port: 3000 }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SERVER_STOP:
      return { ...state, listening: false }
    case SERVER_START:
      return { ...state, listening: true, port: action.payload }
    default:
      return state
  }
}
