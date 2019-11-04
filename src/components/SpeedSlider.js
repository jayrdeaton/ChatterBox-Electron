import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Slider, Typography } from '@material-ui/core'
import { config } from '../refs'

class SpeedSlider extends Component {
  constructor(props) {
    super(props)
    this.state = { value: props.value }
  }
  handleChange = (e, value) => this.setState({ value })
  handleChangeCommitted = () => this.props.onChange(this.state.value)
  render() {
    const {
      handleChange,
      handleChangeCommitted,
      props: { classes },
      state: { value }
    } = this
    return (
      <div className={classes.root}>
        <Typography variant='caption' id='speed-slider-label'>Speed {value}</Typography>
        <Slider
          className={classes.slider}
          value={value}
          aria-labelledby='speed-slider-label'
          onChange={handleChange}
          min={0}
          onChangeCommitted={handleChangeCommitted}
          step={0.1}
          max={config.speed_limit}
        />
      </div>
    )
  }
}
const styles = theme => ({
  root: {
    width: '100%',
  },
  slider: {
    padding: '22px 0px',
  }
})
SpeedSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
}
SpeedSlider = withStyles(styles)(SpeedSlider)
export default SpeedSlider
