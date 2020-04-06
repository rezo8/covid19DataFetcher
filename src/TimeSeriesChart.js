import {Line} from 'react-chartjs-2'
import React, {Component} from 'react';

export default class TimeSeriesChart extends Component {

  render() {
    return (<Line data={this.props.data} options={options}/>);
  }
}

const options = {
  response: true,
  title: {
    display: true,
    fontSize: 18,
    text: "Moving Time Series!"
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
          labelString: 'Value'
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
