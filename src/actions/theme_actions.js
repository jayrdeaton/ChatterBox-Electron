const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'

const toggleDarkMode = () => {
  if (localStorage.getItem('theme_type') === 'dark') {
    localStorage.setItem('theme_type', 'light')
  } else {
    localStorage.setItem('theme_type', 'dark')
  }
  return {
    type: TOGGLE_DARK_MODE
  }
}

export default {
  TOGGLE_DARK_MODE,
  toggleDarkMode
}
