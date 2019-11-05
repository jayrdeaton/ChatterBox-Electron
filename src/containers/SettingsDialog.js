import React, { Component } from 'react'
import { connect } from 'react-redux'
import QRImage from 'react-qr-image'
import { withStyles, withTheme } from '@material-ui/core/styles'
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
  state = { ip: null, port: 3000 }
  componentWillMount() {
    if (window.location.hostname && window.location.hostname !== 'localhost') return
    window.ipcRenderer.send('init')
    window.ipcRenderer.once('status', (e, port, ip) => {
      if (!port) return
      this.setState({ port, ip })
      this.props.startServer({ port, ip })
    })
  }
  handleColorChange = (e) => this.props.setColor(e.target.value)
  handleLanguageChange = (e) => this.props.setLanguage(e.target.value)
  handleNameChange = (e) => this.props.setName(e.target.value)
  handlePortChange = (e) => this.setState({ port: e.target.value })
  handleSpeedChange = (speed) => this.props.setSpeed(speed)
  handleThemeChange = (e) => this.props.setTheme(e.target.value)
  handleVoiceChange = (e) => this.props.setVoice(e.target.value)
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
      window.ipcRenderer.once('status', (e, port, ip) => {
        this.setState({ ip })
        startServer({ port, ip })
      })
    }
  }
  render() {
    const {
      handleColorChange,
      handleLanguageChange,
      handleNameChange,
      handlePortChange,
      handleSpeedChange,
      handleThemeChange,
      handleVoiceChange,
      toggleServer,
      props: {
        classes,
        closeSettings,
        server: { listening },
        settings: { color, language, name, open, speed, theme, voice }
      },
      state: { ip, port }
    } = this
    const electron = !window.location.hostname || window.location.hostname === 'localhost'
    return (
      <Dialog
        open={!electron || listening ? open : true}
        onClose={!electron || listening ? closeSettings : null}
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
                {electron &&
                  <div className={classes.server}>
                    {/*ip && port &&
                      <QRImage text={`http://${ip}:${port}`} background={this.props.theme.palette.background.paper} color={this.props.theme.palette.text.primary} />
                    */}
                    <Grid>
                      <IconButton color='inherit' aria-label='toggle sounds' className={classes.button} onClick={toggleServer}>
                        {listening ?
                          <Stop />
                        :
                          <PlayArrow />
                        }
                      </IconButton>
                      <TextField
                        id='port'
                        label='Port'
                        onChange={handlePortChange}
                        className={classes.port}
                        defaultValue={port}
                        variant='outlined'
                      />
                    </Grid>
                    <br />
                  </div>
                }
                <Grid>
                  <ThemeSelect onChange={handleThemeChange} value={theme} />
                  <ColorSelect onChange={handleColorChange} value={color} />
                </Grid>
                <br />
                <TextField
                  id='name'
                  label='Display Name'
                  fullWidth
                  onBlur={handleNameChange}
                  className={classes.message}
                  defaultValue={name}
                  variant='outlined'
                />
                <br />
                <Grid>
                  <LanguageSelect onChange={handleLanguageChange} value={language} />
                  <VoiceSelect onChange={handleVoiceChange} value={voice} language={language} />
                </Grid>
                <br />
                <SpeedSlider onChange={handleSpeedChange} value={speed} />
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeSettings} style={{marginLeft: 'auto'}} disabled={!electron || listening ? false : true}>
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
  },
  server: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})
SettingsDialog = connect(({ server, settings }) => { return { server, settings } }, { startServer, stopServer, closeSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice })(SettingsDialog)
SettingsDialog = withStyles(styles)(SettingsDialog)
SettingsDialog = withTheme(SettingsDialog)
export default SettingsDialog
