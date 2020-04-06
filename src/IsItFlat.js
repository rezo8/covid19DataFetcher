import React, {Component} from 'react';
import './App.css';
import MovingTimeSeries from "./MovingTimeSeries.js"
class IsItFlat extends Component {

  render() {
    return (<div >
      Below is a graph that demonstrates how many cases we are dealing with currently in the United States. Other features to come!
      <MovingTimeSeries/>
    </div>)
  }
}

export default IsItFlat
