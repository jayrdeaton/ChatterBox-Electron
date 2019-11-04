import { v1 as uuid } from 'uuid'
import { settings_actions } from '../actions'
const { SETTINGS_CLOSE, SETTINGS_OPEN, SETTINGS_COLOR, SETTINGS_LANGUAGE, SETTINGS_NAME, SETTINGS_SPEED, SETTINGS_THEME, SETTINGS_VOICE } = settings_actions

let client = localStorage.getItem('client_id')
if (!client) {
  client = uuid()
  localStorage.setItem('client_id', client)
}
const INITIAL_STATE = {
  open: false,
  client,
  color: localStorage.getItem('color') || 'Indigo',
  language: localStorage.getItem('language') || 'English',
  name: localStorage.getItem('name') || '',
  speed: parseFloat(localStorage.getItem('speed') || 1),
  theme: localStorage.getItem('theme') || 'light',
  voice: parseFloat(localStorage.getItem('voice') || 0)
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SETTINGS_CLOSE:
      return { ...state, open: false }
    case SETTINGS_OPEN:
      return { ...state, open: true }
    case SETTINGS_COLOR:
      localStorage.setItem('color', action.payload)
      return { ...state, color: action.payload }
    case SETTINGS_LANGUAGE:
      localStorage.setItem('language', action.payload)
      localStorage.setItem('voice', 0)
      return { ...state, language: action.payload, voice: 0 }
    case SETTINGS_NAME:
      localStorage.setItem('name', action.payload)
      return { ...state, name: action.payload }
    case SETTINGS_SPEED:
      localStorage.setItem('speed', action.payload)
      return { ...state, speed: action.payload }
    case SETTINGS_THEME:
      localStorage.setItem('theme', action.payload)
      return { ...state, theme: action.payload }
    case SETTINGS_VOICE:
      localStorage.setItem('voice', action.payload)
      return { ...state, voice: action.payload }
    default:
      return state
  }
}
