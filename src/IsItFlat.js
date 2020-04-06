import React, {Component} from 'react';
import './App.css';
import MovingTimeSeries from "./MovingTimeSeries.js"
class IsItFlat extends Component {

  render() {
    return (<div >
      Below is a moving time series where you change the values that each respective line produces every 10 seconds by clicking their respective button.
      <MovingTimeSeries/>
    </div>)
  }
}

export default IsItFlat
