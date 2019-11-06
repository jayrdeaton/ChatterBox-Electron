import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import uuid from 'uuid'
import Lumber from '@infinitetoken/lumber'
import { voices } from '../refs'
import { sounds_actions } from '../actions'
import { ChatterHistory, SoundsDialog } from '../components'
import { stringifyError } from '../helpers'

import MessageForm from './MessageForm'
import SettingsDialog from './SettingsDialog'

const { closeSounds } = sounds_actions
const lumber = Lumber(process.env.REACT_APP_LUMBER_KEY)

class ChatterBox extends Component {
  constructor(props) {
    super(props)
    this.state = {  history: [], message: '', websocket: null }
    this.MessageForm = createRef()
  }
  componentWillMount() {
    if (!window.location.hostname || window.location.hostname !== 'localhost') this.setupWebsocket(window.location.port)
  }
  componentWillReceiveProps(props) {
    if (!props.server.listening && this.props.server.listening && this.state.websocket) this.state.websocket.close()
    if (props.server.listening && !this.props.server.listening) this.setupWebsocket(props.server.port)
  }
  setupWebsocket = async (port) => {
    this.setState({ history: [] })
    const websocket = new WebSocket(`ws://${window.location.hostname || 'localhost'}${port ? `:${port}` : ''}/websocket`)
    websocket.onmessage = (data) => {
      const { history } = this.state
      const chatter = JSON.parse(data.data)
      if (chatter instanceof Array) {
        for (const c of chatter) {
          c.timestamp = new Date(c.timestamp)
          c.voice = voices[c.language].indexOf(c.voice)
          history.push(c)
        }
      } else {
        chatter.timestamp = new Date(chatter.timestamp)
        chatter.voice = voices[chatter.language].indexOf(chatter.voice)
        history.push(chatter)
      }
      this.setState({ history })
    }
    websocket.onopen = () => {
      // lumber.debug('websocket opened!')
    }
    websocket.onerror = (err) => {
      lumber.critical('Websocket error', stringifyError(err))
    }
    // websocket.onclose = () => {
    //   setTimeout(this.setupWebsocket, 500)
    // }
    this.setState({ websocket })
    // return websocket
  }
  updateHistory = (data) => {
    const { history } = this.state
    history.push(data)
    this.setState({ history })
  }
  handleSubmit = async ({ message, sound }) => {
    if (!message && isNaN(sound)) return
    const {
      props: { settings: { client, language, name, speed, voice } },
      state: { websocket }
    } = this
    const voice_name = voices[language][voice]
    const object = {
      client,
      id: uuid.v1(),
      language,
      message,
      name,
      speed,
      voice: voice_name,
      sound,
      timestamp: new Date()
    }
    try {
      await websocket.send(JSON.stringify(object))
    } catch(err) {
      lumber.error('Websocket send', JSON.stringify({ name: err.name, message: err.message }))
    }
  }
  handleReplay = ({ message, sound }) => {
    this.MessageForm.current.scrollIntoView({ behavior: 'smooth' })
    this.handleSubmit({ message, sound })
  }
  render() {
    const {
      props: { classes, settings: { client, open }, sounds },
      state: { history }
    } = this
    return (
      <div className={classes.root}>
        <SettingsDialog open={open} />
        <SoundsDialog open={sounds.open} onSubmit={this.handleSubmit} onClose={this.props.closeSounds} />
        <div className={classes.formWrapper} ref={this.MessageForm}>
          <MessageForm onSubmit={this.handleSubmit} />
        </div>
        <ChatterHistory client={client} history={history} onClick={this.handleReplay} />
      </div>
    )
  }
}
const styles = theme => ({
  // test: console.log(theme),
  appBarSpacer: theme.mixins.toolbar,
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column-reverse',
    overflow: 'scroll'
  },
  formWrapper: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(),
    backgroundColor: theme.palette.background.default,
    zIndex: 43,
    // margin: theme.spacing(2)
  },
  history: {
    flexDirection: 'column-reverse',
    margin: theme.spacing(2)
  },
  said: {
    margin: theme.spacing(),
    padding: theme.spacing(),
    paddingTop: 0
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  timestamp: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  redo: {
    marginLeft: 'auto'
  }
})

ChatterBox.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = ({ server, settings, sounds }) => { return { server, settings, sounds } }

ChatterBox = connect(mapStateToProps, { closeSounds })(ChatterBox)
ChatterBox = withStyles(styles)(ChatterBox)
export default ChatterBox
