import React, {Component} from 'react';

import TimeSeriesChart from "./TimeSeriesChart.js"
import ValChanger from "./ValChanger.js"
import { ApiExecutor } from "./workers/apiExecutor.js"
import './App.css'
import {ButtonToolbar, Grid, Row, Button} from "react-bootstrap";
import Center from 'react-center';
import ControlConsole from './ControlConsole.js'
import { casesOptions, testsOptions, deathsOptions} from './utils/graphOptions.js'

const colors = ['rgba(36, 178, 77, 1)', 'rgba(245, 231, 39, 1)', 'rgba(245, 122, 0, 1)']
const displays = ["Tests", "Cases", "Deaths"]
import {Line} from 'react-chartjs-2'

var rows;

export default class CovidDataDisplay extends Component {
  constructor() {
    super();
    this.apiExec = new ApiExecutor('covid-193.p.rapidapi.com', 'a105fbc46emsh9211cb134c839b1p1d1031jsn8f45ca70b43d' )
    this.state = {
      data: [],
      currentCountry: "USA",
      toDisplay : "Cases",
      graphTitle : "DataDisplay"
    }
  }


   updateDataChart() {
    const currentCountry = this.state.currentCountry
    const thisRef = this
    // TODO add loading screen as this works.
    this.apiExec.getHistoryStatsForCountry(currentCountry, function(data){
        const values = initializeCountryData(data, thisRef.state.currentCountry)
        var toGraph = {}
        toGraph['labels'] = values[0];
        toGraph['datasets'] = [values[1][thisRef.state.toDisplay]];
        thisRef.setState({data: toGraph })
    })
   }

  componentDidMount() {
    this.updateDataChart()
  }

  updateDisplay(toShow){
    if(displays.includes(toShow)){
        this.setState({toDisplay : toShow}, () => {
            this.updateDataChart()
        })

    }
  }

  updateCountry(country){
    //TODO add does country exist validation
    this.setState({currentCountry: country}, () => {
        this.updateDataChart()
    })
  }

  render() {
    return <div>
        <div className='rowC'>
            <div className="chart">
                 <TimeSeriesChart ref={this.myChart} data={this.state.data} options = {casesOptions}/>
            </div>
        </div>
        <div className='displaySelector'>

         <div id="ControlConsole">
                 <Center>
                   <ControlConsole updateDisplay={this.updateDisplay.bind(this)} updateCountry={this.updateCountry.bind(this)} apiRef = {this.apiExec} />
                 </Center>
               </div>
         </div>
     </div>
  }
}


function initializeCountryData(data, title){
    var toRet = {}
    var xAxis = []
    var dataSets = []
    const infoMap = data.dataMap
    const country = data.country
    //var dataSets = [new Map(), new Map(), new Map()]
    var dataSets = [[],[], []]
    for (var key in infoMap) {
      xAxis.push(key)
      dataSets[0].push(infoMap[key].tests.total || 0 )
      dataSets[1].push(infoMap[key].cases.total || 0 )
      dataSets[2].push(infoMap[key].deaths.total || 0 )

    }
    xAxis.reverse()
    dataSets.forEach( x => x.reverse())

    const toGraph = {}
    toGraph[displays[0]] = prepData( displays[0] , colors[0], dataSets[0], title)
    toGraph[displays[1]] = prepData( displays[1] , colors[1], dataSets[1], title)
    toGraph[displays[2]] = prepData( displays[2] , colors[2], dataSets[2], title)
    return [xAxis, toGraph]
}


function prepData(label, color, dataAgg, currentCountry){
    var toPush = {}
    toPush['label'] = label + ' in ' + currentCountry;
    toPush['backgroundColor'] = color;
    toPush['borderColor'] = color;
    toPush['data'] = dataAgg;
    toPush['fill'] = false;
    return toPush
}
