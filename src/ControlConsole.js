import React from "react";
import './App.css';
import {ButtonToolbar, Container, Grid, Col, Row, Button} from "react-bootstrap";
import Center from 'react-center';
import CountrySelector from "./CountrySelector.js"


export default class ControlConsole extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(e) {}

  onIncrement = (value) => {
    this.props.timerChange(value);
  }
  onPlay = (value) => {
    this.props.playCode();
  }

  onStop() {}

  onStep() {}

  handleClick(param) {
    console.log(param)
  }

  toggleDeathVisualization(){
    this.props.updateDisplay("Deaths")
  }

  toggleTestsVisualization(){
    this.props.updateDisplay("Tests")
  }

  toggleCasesVisualization(){
    this.props.updateDisplay("Cases")
  }

  updateCountry(country){
    this.props.updateCountry(country)
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
            <Center>
                 <ButtonToolbar>
                      {/* Indicates a successful or positive action */}
                      <Button bsStyle="success"  onClick={this.toggleTestsVisualization.bind(this)}>Tests</Button>

                      {/* Indicates caution should be taken with this action */}
                      <Button bsStyle="warning" onClick={this.toggleCasesVisualization.bind(this)}>Cases</Button>

                      {/* Indic ates a dangerous or potentially negative action */}
                      <Button bsStyle="danger" onClick={this.toggleDeathVisualization.bind(this)}>Deaths</Button>

                    </ButtonToolbar>
                    <div>
                        <CountrySelector apiRef={this.props.apiRef} updateCountry = {this.updateCountry.bind(this)}> </CountrySelector>
                    </div>
               </Center>
         </Row>
      </Grid>
    )
  }
}
