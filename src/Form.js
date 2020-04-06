import React, {Component} from 'react';
import './App.css';
import {FormGroup, Col, ControlLabel, FormControl, Button} from 'react-bootstrap'
class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.changeSubject = this.changeSubject.bind(this);
  }

  changeMessage(event) {
    this.setState({message: event.target.value});
  }

  changeSubject(event) {
    this.setState({subject: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    window.open('mailto: ribhielzaru@gmail.com?subject=' + this.state.subject + '&body=' + this.state.message);
  }

  render() {
    return (<form horizontal="horizontal">

      <FormGroup controlId="SubjectInput">
        <Col componentClass={ControlLabel} sm={2}>
          Subject
        </Col>
        <Col sm={10}>
          <FormControl type="email" value={this.state.subject} placeholder="Enter Email Subject" onChange={this.changeSubject}/>
        </Col>
      </FormGroup>

      <FormGroup controlId="emailInput">
        <Col componentClass={ControlLabel} sm={2}>
          Message
        </Col>
        <Col sm={10}>
          <FormControl componentClass="textarea" value={this.state.message} placeholder="Enter Message" onChange={this.changeMessage}/>
        </Col>
      </FormGroup>
      <FormGroup controlID="submit">
        <Col sm={10}>
          <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
        </Col>
      </FormGroup>
    </form>);
  }
}

export default Form
