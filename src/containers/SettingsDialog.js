import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField
} from '@material-ui/core'
import { PlayArrow, Stop } from '@material-ui/icons'
import { server_actions, settings_actions } from '../actions'
import { ColorSelect, LanguageSelect, SpeedSlider, ThemeSelect, VoiceSelect } from '../components'

const { startServer, stopServer } = server_actions
const { closeSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice } = settings_actions

class SettingsDialog extends Component {
  state = { port: 3000 }
  componentWillMount() {
    window.ipcRenderer.send('init')
    window.ipcRenderer.once('status', (e, port) => {
      if (!port) return
      this.setState({ port })
      this.props.startServer(port)
    })
  }
  toggleServer = () => {
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
  handleColorChange = (e) => this.props.setColor(e.target.value)
  handleLanguageChange = (e) => this.props.setLanguage(e.target.value)
  handleNameChange = (e) => this.props.setName(e.target.value)
  handlePortChange = (e) => this.setState({ port: e.target.value })
  handleSpeedChange = (speed) => this.props.setSpeed(speed)
  handleThemeChange = (e) => this.props.setTheme(e.target.value)
  handleVoiceChange = (e) => this.props.setVoice(e.target.value)
  render() {
    const {
      handleColorChange,
      handleLanguageChange,
      handleNameChange,
      handleSpeedChange,
      handleThemeChange,
      handleVoiceChange,
      props: {
        classes,
        closeSettings,
        server: { listening },
        settings: { color, language, name, open, speed, theme, voice }
      },
      state: { port }
    } = this
    return (
      <Dialog
        open={listening ? open : true}
        onClose={listening ? closeSettings : null}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        scroll={'body'}
      >
        <form>
          <DialogTitle id='settings-dialog'>Settings</DialogTitle>
          <DialogContent>
            <div className={classes.form}>
              <Grid
                container
                direction='column'
                justify='space-between'
                alignItems='center'
                spacing={0}
              >
                <Grid>
                  <IconButton color='inherit' aria-label='toggle sounds' className={classes.button} onClick={this.toggleServer}>
                    {listening ?
                      <Stop />
                    :
                      <PlayArrow />
                    }
                  </IconButton>
                  <TextField
                    id='port'
                    label='Port'
                    onChange={this.handlePortChange}
                    className={classes.port}
                    defaultValue={port}
                    variant='outlined'
                  />
                </Grid>
                <br />
                <Grid>
                  <ThemeSelect onChange={this.handleThemeChange} value={theme} />
                  <ColorSelect onChange={this.handleColorChange} value={color} />
                </Grid>
                <br />
                <TextField
                  id='name'
                  label='Display Name'
                  fullWidth
                  onBlur={this.handleNameChange}
                  className={classes.message}
                  defaultValue={name}
                  variant='outlined'
                />
                <br />
                <Grid>
                  <LanguageSelect onChange={this.handleLanguageChange} value={language} />
                  <VoiceSelect onChange={this.handleVoiceChange} value={voice} language={language} />
                </Grid>
                <br />
                <SpeedSlider onChange={this.handleSpeedChange} value={speed} />
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeSettings} style={{marginLeft: 'auto'}} disabled={listening ? false : true}>
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}
const styles = theme => ({
  button: {
    marginRight: theme.spacing()
  },
  form: {
    margin: theme.spacing(2)
  }
})
SettingsDialog = connect(({ server, settings }) => { return { server, settings } }, { startServer, stopServer, closeSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice })(SettingsDialog)
SettingsDialog = withStyles(styles)(SettingsDialog)
export default SettingsDialog
