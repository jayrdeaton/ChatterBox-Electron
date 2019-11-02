import React from 'react'
import PropTypes from 'prop-types'
import { ButtonBase, Paper, Typography } from '@material-ui/core'
import { withStyles, withTheme } from '@material-ui/core/styles'
import { sounds, voices } from '../refs'
import classNames from 'class-names'

let ChatterHistory = ({ classes, client, history, onClick, theme }) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.history}>
        {history.map((chatter, index) =>
          <div key={chatter.id} className={classNames(classes.message, chatter.client === client && classes.clientMessage)}>
            <Typography align={chatter.client === client ? 'right' : 'left'} className={classes.name} color='textSecondary' variant='caption'>
              {chatter.name ? chatter.name : voices[chatter.language][chatter.voice]}
            </Typography>
            <Paper className={classNames(classes.paper, chatter.client === client && classes.clientPaper)} >
              <ButtonBase onClick={() => onClick(chatter)}>
                {chatter.message ?
                  <Typography align={chatter.client === client ? 'right' : 'left'} color='inherit' variant='subtitle1' component='p'>
                    {chatter.message}
                  </Typography>
                : null}
                {!isNaN(chatter.sound) ?
                  <Typography style={{width: '100%'}} align='center' color='inherit' variant='subtitle1' component='p'>
                    *{sounds[chatter.sound]}*
                  </Typography>
                : null}
              </ButtonBase>
            </Paper>

          </div>
        )}
      </div>
    </div>
  )
}
const styles = theme => ({
  wrapper: {
    paddingTop: 75,
    paddingBottom: 85,
  },
  history: {
    flex: 1,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  name: {
    display: 'block',
  },
  message: {
    alignSelf: 'flex-start',
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    marginTop: theme.spacing(.5)
  },
  clientMessage: {
    alignSelf: 'flex-end',
  },
  paper: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing()
  },
  clientPaper: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  }
})

ChatterHistory.propTypes = {
  classes: PropTypes.object.isRequired
}

ChatterHistory = withStyles(styles)(ChatterHistory)
ChatterHistory = withTheme(ChatterHistory)
export default ChatterHistory
