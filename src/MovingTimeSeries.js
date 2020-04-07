import React, {Component} from 'react';

import TimeSeriesChart from "./TimeSeriesChart.js"
import ValChanger from "./ValChanger.js"
import { ApiExecutor } from "../workers/apiExecutor.js"
import './App.css'
import {ButtonToolbar, Grid, Row, Button} from "react-bootstrap";
import Center from 'react-center';
import ControlConsole from './ControlConsole.js'

const colors = ['rgba(36, 178, 77, 1)', 'rgba(245, 231, 39, 1)', 'rgba(245, 122, 0, 1)']
const displays = ["Tests", "Cases", "Deaths"]

var rows;

export default class MovingTimeSeries extends Component {
  constructor() {
    super();
    this.apiExec = new ApiExecutor('covid-193.p.rapidapi.com', 'a105fbc46emsh9211cb134c839b1p1d1031jsn8f45ca70b43d' )
    this.state = {
      data: [],
      currentCountry: "USA",
      toDisplay : "Cases"
    }
  }


   updateDataChart() {
    const currentCountry = this.state.currentCountry
    const thisRef = this
    this.apiExec.getHistoryStatsForCountry(currentCountry, function(data){
        const values = initializeCountryData(data)
        var toGraph = {}
        toGraph['labels'] = values[0];
        toGraph['datasets'] = [values[1][thisRef.state.toDisplay]];
        console.log(toGraph)
        thisRef.setState({data: toGraph })
        console.log(thisRef.state)
    })
   }

  componentDidMount() {
    this.updateDataChart()
  }

  updateDisplay(toShow){
    console.log(toShow)
    if(displays.includes(toShow)){
        this.setState({toDisplay : toShow})
        this.updateDataChart()
    }
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
                   <ControlConsole updateDisplay={this.updateDisplay.bind(this)} />
                 </Center>
               </div>
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


      dataSets[0].push(infoMap[key].tests.total || 0 )
      dataSets[1].push(infoMap[key].cases.total || 0 )
      dataSets[2].push(infoMap[key].deaths.total || 0 )

    }
    xAxis.reverse()
    dataSets.forEach( x => x.reverse())

    const toGraph = {}
    toGraph[displays[0]] = prepData( displays[0] , colors[0], dataSets[0])
    toGraph[displays[1]] = prepData( displays[1] , colors[1], dataSets[1])
    toGraph[displays[2]] = prepData( displays[2] , colors[2], dataSets[2])
    return [xAxis, toGraph]
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


const casesOptions = {
  response: true,
  title: {
    display: true,
    fontSize: 18,
    text: "Data Display"
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Cases'
        },
        ticks: {
          suggestedMin: -2,
          suggestedMax: 5
        }
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }

}

const deathsOptions = {
  response: true,
  title: {
    display: true,
    fontSize: 18,
    text: "Data Display"
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Deaths'
        },
        ticks: {
          suggestedMin: -2,
          suggestedMax: 5
        }
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }

}

const testsOptions = {
  response: true,
  title: {
    display: true,
    fontSize: 18,
    text: "Data Display"
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  elements: {
    line: {
      tension: 0
    }
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Time'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Tests'
        },
        ticks: {
          suggestedMin: -2,
          suggestedMax: 5
        }
      }
    ]
  },
  legend: {
    display: true
  },
  tooltips: {
    mode: 'index',
    intersect: false
  }

}
