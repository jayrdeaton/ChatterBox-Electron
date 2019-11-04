import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IconButton, TextField, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { PlayArrow, Stop } from '@material-ui/icons'

import { server_actions } from '../actions'
const { startServer, stopServer } = server_actions

class ServerToolbar extends Component {
  state = { port: 3000 }
  componentWillMount() {
    window.ipcRenderer.send('init')
    window.ipcRenderer.once('status', (e, port) => {
      if (!port) return
      this.setState({ port })
      this.props.startServer(port)
    })
  }
  handleChange = (e) => this.setState({ port: e.target.value })
  handleClick = () => {
    const {
      props: { startServer, stopServer, server: { listening } },
      state: { port }
    } = this
    if (listening) {
      window.ipcRenderer.send('stop_server')
      stopServer()
    } else {
      window.ipcRenderer.send('start_server', port)
      startServer(port)
    }
  }
  render() {
    if (window.location.hostname && window.location.hostname !== 'localhost') return null
    const {
      handleChange,
      handleClick,
      props: {
        classes,
        server: { listening }
      },
      state: { port }
    } = this
    return (
      <div className={classes.container}>
        <IconButton color='inherit' aria-label='toggle sounds' className={classes.button} onClick={handleClick}>
          {listening ?
            <Stop />
          :
            <PlayArrow />
          }
        </IconButton>
        <Typography className={classes.label}>
          Port
        </Typography>
        <TextField
          id='port-input'
          margin='normal'
          value={port}
          onChange={handleChange}
          disabled={listening}
        />
      </div>
    )
  }
}
const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginRight: theme.spacing(),
    marginTop: 6,
  }
})
const mapStateToProps = ({ server }) => {
  return { server }
}
ServerToolbar = connect(mapStateToProps, { startServer, stopServer })(ServerToolbar)
ServerToolbar = withStyles(styles)(ServerToolbar)
export default ServerToolbar
