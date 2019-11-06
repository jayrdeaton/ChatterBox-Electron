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
import { voices } from '../refs'

let LanguageSelect = ({ classes, className, onChange, value }) => (
  <FormControl className={classNames(classes.formControl, className)}>
    <InputLabel htmlFor='language-select'>Language</InputLabel>
    <Select
      value={value ? value : ''}
      onChange={onChange}
      inputProps={{
        name: 'language',
        id: 'language-select'
      }}
    >
      {Object.keys(voices).sort().map((language, index) =>
        <MenuItem key={index} value={language}>{language}</MenuItem>
      )}
    </Select>
  </FormControl>
)
const styles = theme => ({
  formControl: {
    // minWidth: 120,
  }
})
LanguageSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}
LanguageSelect = withStyles(styles)(LanguageSelect)
export default LanguageSelect
