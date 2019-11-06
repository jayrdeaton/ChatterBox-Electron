import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'

let ThemeSelect = ({ classes, className, onChange, value }) => (
  <FormControl className={classNames(classes.formControl, className)}>
    <InputLabel htmlFor='theme-select'>Theme</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      inputProps={{
        name: 'theme',
        id: 'theme-select'
      }}
    >
      <MenuItem value={'light'}>Light</MenuItem>
      <MenuItem value={'dark'}>Dark</MenuItem>
    </Select>
  </FormControl>
)
const styles = theme => ({
  formControl: {
    // minWidth: 120,
  }
})
ThemeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}
ThemeSelect = withStyles(styles)(ThemeSelect)
export default ThemeSelect
