import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { AppContent, AppHeader } from '../containers'

import ChatterBox from './ChatterBox'

let App = ({ classes }) => {
  return (
    <div className={classes.root}>
      <AppHeader />
      <AppContent>
        <ChatterBox />
      </AppContent>
    </div>
  )
}
const styles = theme => ({
  root: {
    display: 'flex',
    flex: 1,
    height: '100%'
  },
  content: {
    padding: theme.spacing(3),
  },
  listItem: {
    padding: theme.spacing(2)
  }
})
App.propTypes = {
  classes: PropTypes.object.isRequired,
}

App = withStyles(styles)(App)

export default App
