import React, {Component} from 'react';
import './App.css';
import CovidDataDisplay from "./CovidDataDisplay.js"
class IsItFlat extends Component {

  render() {
    return (<div >
      Below is a graph that demonstrates how many cases, tests, or deaths we are dealing with currently in the nation of your choice. The default nation is the USA, and there are other features to come!!!
      <br/>
      <br/>
      Upcoming Features:
      <br/>
      <ul>
        <li>SIR Model projection based on real data</li>
        <li>Have a sortable and filterable csv display of the data for all countries</li>
        <li>Aesthetic Improvements</li>
      </ul>
      <CovidDataDisplay/>
    </div>)
  }
}

export default IsItFlat
