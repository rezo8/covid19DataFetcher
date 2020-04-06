import React, {Component} from 'react';

export default class ValChanger extends Component {

  render() {
    return (<button onClick={this.props.handleClick}>{this.props.name}</button>);
  }
}
