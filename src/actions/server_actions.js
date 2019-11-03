const SERVER_START = 'SERVER_START'
const SERVER_STOP = 'SERVER_STOP'

const startServer = () => {
  return {
    type: SERVER_START
  }
}
const stopServer = () => {
  return {
    type: SERVER_STOP
  }
}

export default {
  SERVER_START, SERVER_STOP,
  startServer, stopServer
}
