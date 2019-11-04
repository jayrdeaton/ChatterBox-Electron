import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Album, Clear, Send } from '@material-ui/icons'
import { sounds_actions } from '../actions'

const { openSounds } = sounds_actions

class MessageForm extends Component {
  state = { last_message: '', message: '' }
  handleClear = () => this.setState({ message: '' })
  handleKeyPress = (e) => {
    const { altKey, ctrlKey, shiftKey, charCode } = e
    if (!altKey && !ctrlKey && !shiftKey && charCode === 13) this.handleSubmit(e)
  }
  handleMessageChange = (e) => this.setState({ message: e.target.value })
  handleSubmit = (e) => {
    if (e) e.preventDefault()
    const message = this.state.message || this.state.last_message
    this.setState({ last_message: message, message: '' })
    this.props.onSubmit({ message })
  }
  render() {
    const {
      handleClear,
      handleKeyPress,
      handleMessageChange,
      handleSubmit,
      props: { classes, openSounds },
      state: { message }
    } = this
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            spacing={0}
          >
            <TextField
              id='message'
              label='Message'
              autoFocus
              multiline
              rowsMax={4}
              onKeyPress={handleKeyPress}
              autoComplete={null}
              className={classes.message}
              value={message}
              onChange={handleMessageChange}
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {message ?
                      <IconButton
                        edge='end'
                        aria-label='clear message'
                        className={classes.button}
                        onClick={handleClear}
                      >
                        <Clear fontSize='inherit' />
                      </IconButton>
                    :
                      <IconButton
                        edge='end'
                        aria-label='random message'
                        className={classes.button}
                        onClick={openSounds}
                      >
                        <Album fontSize='inherit' />
                      </IconButton>
                    }

                  </InputAdornment>
                )
              }}
            />
            <IconButton
              type='submit'
              className={classes.button}
            >
              <Send fontSize='inherit' />
            </IconButton>
          </Grid>
        </form>
      </div>
    )
  }
}
const styles = theme => ({
  message: {
    flexGrow: 1,
    marginRight: theme.spacing()
    // margin: 0
  },
  voice: {
    // margin: theme.spacing()
  },
  button: {
    // margin: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  }
})

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired
}

MessageForm = connect(null, { openSounds })(MessageForm)
MessageForm = withStyles(styles)(MessageForm)

export default MessageForm
