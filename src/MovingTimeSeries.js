import React, {Component} from 'react';

import TimeSeriesChart from "./TimeSeriesChart.js"
import ValChanger from "./ValChanger.js"
import { ApiExecutor } from "../workers/apiExecutor.js"
import './App.css'

const colors = ['rgba(0,0,204,1)', 'rgba(0,204,204,1)', 'rgba(204,0,0,1)']

var rows;

export default class MovingTimeSeries extends Component {
  constructor() {
    super();
    this.apiExec = new ApiExecutor('covid-193.p.rapidapi.com', 'a105fbc46emsh9211cb134c839b1p1d1031jsn8f45ca70b43d' )
    this.state = {
      data: [],
      currentCountry: "USA"
    }
  }


   updateDataChart() {
    const currentCountry = this.state.currentCountry
    const thisRef = this
    this.apiExec.getHistoryStatsForCountry(currentCountry, function(data){
        thisRef.setState({data: initializeCountryData(data)})
        console.log(thisRef.state)
    })
   }

  componentDidMount() {
    this.updateDataChart()
  }
  render() {
    return <div className='rowC'>
      <div className="chart">
        <TimeSeriesChart ref={this.myChart} data={this.state.data}/>
      </div>
    </div>

  }
}


function initializeCountryData( data){
    // TODO figure out how to make it so that we iterate from past to present in the beginning.
    // TODO try not to reverse ugh
    // TODO figure out how to use the map dataformat here: https://www.chartjs.org/docs/latest/charts/line.html
    // Think of a good way to allow multiple to display

    var toRet = {}
    var xAxis = []
    var dataSets = []
    const infoMap = data.dataMap
    console.log(infoMap)
    const country = data.country
    //var dataSets = [new Map(), new Map(), new Map()]
    var dataSets = [[],[], []]
    console.log(dataSets)
    for (var key in infoMap) {
      xAxis.push(key)
      console.log(typeof(key))

      //dataSets[0].set(key, infoMap[key].tests.total || 0 )
      //dataSets[1].set(key, infoMap[key].cases.total || 0 )
      //dataSets[2].set(key, infoMap[key].deaths.total || 0 )

      //dataSets[0].push(infoMap[key].tests.total || 0 )
      dataSets[1].push(infoMap[key].cases.total || 0 )
      //dataSets[2].push(infoMap[key].deaths.total || 0 )

    }
    xAxis.reverse()
    dataSets.forEach( x => x.reverse())

    const toGraph = [prepData("Tests", colors[0], dataSets[0]), prepData("cases", colors[1], dataSets[1]),prepData("deaths", colors[2], dataSets[2]) ]
    toRet['labels'] = xAxis;
    toRet['datasets'] = toGraph;
    console.log(toRet)
    return toRet
}


function prepData(label, color, dataAgg){
    var toPush = {}
    toPush['label'] = label;
    toPush['backgroundColor'] = color;
    toPush['borderColor'] = color;
    toPush['data'] = dataAgg;
    toPush['fill'] = false;
    return toPush
}


