import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import QRCode from 'qrcode-svg'
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
const { closeSettings, openSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice } = settings_actions

const QR_SIZE = 128

class SettingsDialog extends Component {
  state = { ip: null, port: 5000 }
  componentWillMount() {
    if (window.location.hostname && window.location.hostname !== 'localhost') return
    window.ipcRenderer.send('init')
    window.ipcRenderer.once('status', (e, port, ip) => {
      if (!port) {
        if (!this.props.settings.open) this.props.openSettings()
        return
      }
      this.setState({ ip, port })
      this.props.startServer({ port, ip })
    })
  }
  generateQR = ({ ip, port }) => {
    const { palette } = this.props.theme
    return new QRCode({
      content: `http://${ip}:${port}`,
      padding: 0,
      background: palette.background.paper,
      color: palette.text.primary,
      height: QR_SIZE,
      width: QR_SIZE
    }).svg()
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
        if (!port) return
        this.setState({ ip })
        startServer({ port, ip })
      })
    }
  }
  render() {
    const {
      generateQR,
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
    const qr = ip && port ? generateQR({ ip, port }) : null
    const electron = !window.location.hostname || window.location.hostname === 'localhost'
    return (
      <Dialog
        open={open}
        onClose={!electron || listening ? closeSettings : null}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        scroll={'body'}
      >
        <form>
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
                    <DialogTitle className={classes.title}>Server</DialogTitle>
                    <div className={classNames(classes.qr, listening && classes.qr_visible)} dangerouslySetInnerHTML={{__html: qr}} />
                    <Grid className={classes.group}>
                      <IconButton color='inherit' aria-label='toggle sounds' className={classes.button} onClick={toggleServer}>
                        {listening ? <Stop /> : <PlayArrow /> }
                      </IconButton>
                      <TextField
                        id='port'
                        label='Port'
                        onChange={handlePortChange}
                        className={classes.input}
                        defaultValue={port}
                        variant='outlined'
                        disabled={listening}
                      />
                    </Grid>
                  </div>
                }
                <DialogTitle className={classes.title}>Theme</DialogTitle>
                <Grid className={classes.group}>
                  <ThemeSelect className={classes.input} onChange={handleThemeChange} value={theme} />
                  <ColorSelect className={classes.input} onChange={handleColorChange} value={color} />
                </Grid>
                <DialogTitle className={classes.title}>Chatter</DialogTitle>
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
                <Grid className={classes.group}>
                  <LanguageSelect className={classes.input} onChange={handleLanguageChange} value={language} />
                  <VoiceSelect className={classes.input} onChange={handleVoiceChange} value={voice} language={language} />
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
    marginTop: theme.spacing(),
    marginRight: theme.spacing(),
    marginBottom: theme.spacing()
  },
  form: {
    // margin: theme.spacing(2)
  },
  server: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    paddingLeft: 0
  },
  group: {
    width: '100%',
    display: 'flex'
  },
  input: {
    flex: 1
  },
  qr: {
    overflow: 'hidden',
    transition: theme.transitions.create(['height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 0,
    marginBottom: 0
  },
  qr_visible: {
    transition: theme.transitions.create(['height', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: QR_SIZE,
    marginBottom: theme.spacing(2)
  }
})
SettingsDialog = connect(({ server, settings }) => { return { server, settings } }, { startServer, stopServer, closeSettings, openSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice })(SettingsDialog)
SettingsDialog = withStyles(styles)(SettingsDialog)
SettingsDialog = withTheme(SettingsDialog)
export default SettingsDialog
