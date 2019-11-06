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
import { colors } from '../refs'

let ColorSelect = ({ classes, className, onChange, value }) => (
  <FormControl className={classNames(classes.formControl, className)}>
    <InputLabel htmlFor='color-select'>Color</InputLabel>
    <Select
      className={classes.select}
      value={value}
      onChange={onChange}
      inputProps={{
        name: 'color',
        id: 'color-select'
      }}
    >
      {Object.keys(colors).filter((c) => c === 'default' ? false : true ).map((color, index) =>
        <MenuItem style={{color: colors[color][500]}} key={index} value={color}>{color}</MenuItem>
      )}
    </Select>
  </FormControl>
)
const styles = theme => ({
  formControl: {
    // minWidth: 120,
  },
  select: {
    // color: theme.palette.primary[500],
  }
})
ColorSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}
ColorSelect = withStyles(styles)(ColorSelect)
export default ColorSelect
