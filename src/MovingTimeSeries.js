import React, {Component} from 'react';

import TimeSeriesChart from "./TimeSeriesChart.js"
import ValChanger from "./ValChanger.js"
import './App.css'

const colors = ['rgba(0,0,204,1)', 'rgba(204,0,0,1)', 'rgba(0,204,204,1)']

var data = initData(60000 * 5, 10000, 1, 3);
var rows;

export default class MovingTimeSeries extends Component {
  constructor() {
    super();
    rows = genRows(this, 1, 3);
    this.state = {
      nextData: generateDataRefs(1, 3),
      data: data
    }
  }
  componentDidMount() {
    var method = updateCharts.bind(this);
    setInterval(method, 10000);
  }
  render() {
    return <div className='rowC'>
      <div className="chart">
        <TimeSeriesChart ref={this.myChart} data={this.state.data}/>
      </div>
      <div className="buttons">
        {rows}
      </div>
    </div>

  }
}

function initData(range, step, startVal, endVal) {

  var end = Date.now();
  var start = end - range;
  var labels = [];
  while (start <= end) {
    var date = new Date(start);
    labels.push(date.toTimeString().split(' ')[0])
    start += step;
  }
  var toRet = {}
  var dataSets = []

  for (var i = startVal; i <= endVal; i++) {
    var toPush = {}
    var dataToPush = new Array(labels.length).fill(i);

    var color = colors[i - 1];
    toPush['label'] = "Line #" + i;
    toPush['backgroundColor'] = color;
    toPush['borderColor'] = color;
    toPush['data'] = dataToPush;
    toPush['fill'] = false;

    dataSets.push(toPush);
  }
  toRet['labels'] = labels;
  toRet['datasets'] = dataSets;
  return toRet;
}

function updateCharts(time) {
  time = new Date().toTimeString().split(' ')[0];

  var newData = this.state.data;
  newData.labels = newData.labels.slice(1, newData.labels.length);
  newData.labels.push(time);
  var nextData = this.state.nextData;

  newData.datasets.forEach(function(data) {

    var trueData = data.data;
    trueData = trueData.slice(1, trueData.length);
    var index = newData.datasets.indexOf(data);
    trueData.push(nextData[index + 1]);
    data['data'] = trueData;
  });

  this.setState({data: newData})

}

function generateDataRefs(startVal, endVal) {
  var toRet = {}
  for (var i = startVal; i <= endVal; i++) {
    toRet[i] = i;
  }
  return toRet;
}

function updateNextVal(index, diff) {
  var nextData = this.state.nextData;
  nextData[index] = nextData[index] + diff;
  this.setState({nextData: nextData})
}

function genRows(parent, startVal, endVal) {
  var toRet = []
  for (var i = startVal; i <= endVal; i++) {
    var leftName = "Line" + i + " +";
    var rightName = "Line" + i + " -";
    var left = <ValChanger name={leftName} handleClick={updateNextVal.bind(parent, i, 1)}/>
    var right = <ValChanger name={rightName} handleClick={updateNextVal.bind(parent, i, -1)}/>

    toRet.push(<div class="btn-group">
      {left}
      {right}
    </div>);
  }
  return toRet;
}
