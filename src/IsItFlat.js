import React, {Component} from 'react';
import './App.css';
import MovingTimeSeries from "./MovingTimeSeries.js"
class IsItFlat extends Component {

  render() {
    return (<div >
      Below is a graph that demonstrates how many cases, tests, or deaths we are dealing with currently in the nation of your choice. The default nation is the USA, and there are other features to come!!!
      <br/>
      Some known bugs/issues: Sometimes switching the country doesn't refresh the axes of the graph, and you need to clic on either cases, tests or deaths for it to take effect.
      <MovingTimeSeries/>
    </div>)
  }
}

export default IsItFlat
