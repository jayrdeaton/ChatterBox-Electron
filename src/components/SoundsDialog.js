import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Typography
} from '@material-ui/core'
import faker from 'faker'
import { sounds } from '../refs'

class SoundsDialog extends Component {
  render() {
    const { classes, onClose, onSubmit, open } = this.props
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        scroll={'body'}
      >
        <DialogContent>
          <Typography>Sounds</Typography>
          {sounds.map((sound, index) =>
            <Button key={sound} variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ sound: index })}>
              {sound}
            </Button>
          )}
          <Divider />
          <Typography>Random</Typography>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.random.word() })}>
            Word
          </Button>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.random.words() })}>
            Words
          </Button>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.address.city() })}>
            City
          </Button>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.address.state() })}>
            State
          </Button>
          <Divider />
          <Typography>Lorem</Typography>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.lorem.sentence() })}>
            Sentence
          </Button>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.lorem.sentences() })}>
            Sentences
          </Button>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.lorem.paragraph() })}>
            Paragraph
          </Button>
          <Button variant='contained' color='primary' className={classes.button} onClick={() => onSubmit({ message: faker.lorem.paragraphs() })}>
            Paragraphs
          </Button>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
const styles = theme => ({
  button: {
    margin: theme.spacing(.5)
  }
})
SoundsDialog = withStyles(styles)(SoundsDialog)
export default SoundsDialog
