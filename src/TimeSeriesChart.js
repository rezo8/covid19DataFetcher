import {Line} from 'react-chartjs-2'
import React, {Component} from 'react';

export default class TimeSeriesChart extends Component {

  render() {
    return (<Line data={this.props.data} options={this.props.options}/>);
  }
}


