const SERVER_START = 'SERVER_START'
const SERVER_STOP = 'SERVER_STOP'

const startServer = (payload) => {
  return {
    type: SERVER_START,
    payload
  }
}
const stopServer = (payload) => {
  return {
    type: SERVER_STOP,
    payload
  }
}

export default {
  SERVER_START, SERVER_STOP,
  startServer, stopServer
}
