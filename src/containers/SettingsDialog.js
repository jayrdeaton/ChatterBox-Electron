import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@material-ui/core'
import { settings_actions } from '../actions'
import { ColorSelect, LanguageSelect, SpeedSlider, ThemeSelect, VoiceSelect } from '../components'

const { closeSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice } = settings_actions

class SettingsDialog extends Component {
  handleColorChange = (e) => this.props.setColor(e.target.value)
  handleLanguageChange = (e) => this.props.setLanguage(e.target.value)
  handleNameChange = (e) => this.props.setName(e.target.value)
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
        settings: { color, language, name, open, speed, theme, voice }
      },
    } = this
    return (
      <Dialog
        open={open}
        onClose={closeSettings}
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
            <Button onClick={closeSettings} style={{marginLeft: 'auto'}}>
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}
const styles = theme => ({
  form: {
    margin: theme.spacing(2)
  }
})
SettingsDialog = connect(({ settings }) => { return { settings } }, { closeSettings, setColor, setLanguage, setName, setSpeed, setTheme, setVoice })(SettingsDialog)
SettingsDialog = withStyles(styles)(SettingsDialog)
export default SettingsDialog
