import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Settings as SettingsIcon } from '@material-ui/icons'
import { settings_actions } from '../actions'

import Logo from './Logo'

const { openSettings } = settings_actions

class AppHeader extends Component {
  render() {
    const { classes, openSettings } = this.props
    return (
      <AppBar
        position='absolute'
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Logo className={classes.logo} />
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            ChatterBox
          </Typography>
          <IconButton color='inherit' aria-label='toggle settings' className={classes.button} onClick={openSettings}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )
  }
}
const styles = theme => ({
  toolbar: {
    paddingLeft: theme.spacing(),
    paddingRight: theme.spacing()
  },
  logo: {
    height: 50,
    width: 50,
    marginRight: theme.spacing()
  },
  appBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
    WebkitAppRegion: 'drag',
    paddingTop: theme.spacing()
  },
  title: {
    flexGrow: 1,
  }
})
AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
}
AppHeader = connect(null, { openSettings })(AppHeader)
AppHeader = withStyles(styles)(AppHeader)
export default AppHeader
