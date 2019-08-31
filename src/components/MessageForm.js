import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Autorenew, Clear, Send } from '@material-ui/icons'
import faker from 'faker'

class MessageForm extends Component {
  state = { last_message: '', message: '' }
  handleClear = () => this.setState({ message: '' })
  handleKeyPress = (e) => {
    const { altKey, ctrlKey, shiftKey, charCode } = e
    if (!altKey && !ctrlKey && !shiftKey && charCode === 13) this.handleSubmit(e)
  }
  handleMessageChange = (e) => this.setState({ message: e.target.value })
  handleRandom = () => this.setState({ message: faker.random.words() })
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
      handleRandom,
      handleSubmit,
      props: { classes },
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
                        onClick={handleClear}
                      >
                        <Clear />
                      </IconButton>
                    :
                      <IconButton
                        edge='end'
                        aria-label='random message'
                        onClick={handleRandom}
                      >
                        <Autorenew />
                      </IconButton>
                    }

                  </InputAdornment>
                )
              }}
            />
            <IconButton
              type='submit'
              className={classes.submit}
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
  submit: {
    // margin: theme.spacing(),
    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },
  }
})

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired
}

MessageForm = withStyles(styles)(MessageForm)

export default MessageForm
