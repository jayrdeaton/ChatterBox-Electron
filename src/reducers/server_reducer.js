import { server_actions } from '../actions'
const { SERVER_START, SERVER_STOP } = server_actions

const INITIAL_STATE = { listening: false }

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SERVER_STOP:
      return { ...state, listening: false }
    case SERVER_START:
      return { ...state, listening: true }
    default:
      return state
  }
}
