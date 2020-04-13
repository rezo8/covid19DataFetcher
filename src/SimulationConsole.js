import React from "react";
import './App.css';
import {Form, FormGroup, ControlLabel, FormControl, Button, Col, Checkbox } from "react-bootstrap";
import Center from 'react-center';
import CountrySelector from "./CountrySelector.js"

//https://react-bootstrap-v3.netlify.com/components/forms/

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
    <Center>
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl type="text" placeholder="Jane Doe" />
        </FormGroup>{' '}
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>Email</ControlLabel>{' '}
          <FormControl type="email" placeholder="jane.doe@example.com" />
        </FormGroup>{' '}
        <Button type="submit">Send invitation</Button>
      </Form>
    </Center>)
  }
}
