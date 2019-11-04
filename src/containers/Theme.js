import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { colors } from '../refs'

class Theme extends Component {
  render() {
    const { settings } = this.props
    const theme = createMuiTheme({
      palette: {
        primary: colors[settings.color] || colors.default,
      //   primary: {
      //     // light: '#a7b934',
      //     // main: '#343a40',
      //     // main: '#379441',
      //     // main: '#20aced'
      //     // dark: '#379441',
      //     // contrastText: '#fff',
      //   },
      //   secondary: {
      //     // light: '#ff7961',
      //     // main: '#a7b934',
      //     // main: '#42b04e'
      //     // main: '#20aced'
      //     // dark: '#ba000d',
      //     // contrastText: '#000',
      //   },
        type: settings.theme
      },
      typography: {
        useNextVariants: true,
      }
    })
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {this.props.children}
      </MuiThemeProvider>
    )
  }
}
Theme.propTypes = {
  settings: PropTypes.object.isRequired
}
Theme = connect(({ settings }) => { return { settings } })(Theme)
export default Theme
