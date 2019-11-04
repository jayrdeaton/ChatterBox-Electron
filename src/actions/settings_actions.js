const SETTINGS_CLOSE = 'SETTINGS_CLOSE'
const SETTINGS_OPEN = 'SETTINGS_OPEN'
const SETTINGS_COLOR = 'SETTINGS_COLOR'
const SETTINGS_LANGUAGE = 'SETTINGS_LANGUAGE'
const SETTINGS_NAME = 'SETTINGS_NAME'
const SETTINGS_SPEED = 'SETTINGS_SPEED'
const SETTINGS_THEME = 'SETTINGS_THEME'
const SETTINGS_VOICE = 'SETTINGS_VOICE'

const closeSettings = () => {
  return {
    type: SETTINGS_CLOSE
  }
}
const openSettings = () => {
  return {
    type: SETTINGS_OPEN
  }
}
const setColor = (payload) => {
  return {
    type: SETTINGS_COLOR,
    payload
  }
}
const setLanguage = (payload) => {
  return {
    type: SETTINGS_LANGUAGE,
    payload
  }
}
const setName = (payload) => {
  return {
    type: SETTINGS_NAME,
    payload
  }
}
const setSpeed = (payload) => {
  return {
    type: SETTINGS_SPEED,
    payload
  }
}
const setTheme = (payload) => {
  return {
    type: SETTINGS_THEME,
    payload
  }
}
const setVoice = (payload) => {
  return {
    type: SETTINGS_VOICE,
    payload
  }
}

export default {
  SETTINGS_CLOSE, SETTINGS_OPEN, SETTINGS_COLOR, SETTINGS_LANGUAGE, SETTINGS_NAME, SETTINGS_SPEED, SETTINGS_THEME, SETTINGS_VOICE,
  closeSettings, openSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice
}
