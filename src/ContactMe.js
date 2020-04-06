import React, {Component} from 'react';
import './App.css';
import {PageHeader} from 'react-bootstrap';
import Form from './Form.js'
class ContactMe extends Component {

  render() {
    return (<div >
      <div className="Center">
        <PageHeader>
          Hey, again. Thanks for thinking to reach out to me!
        </PageHeader>
      </div>
      <div >
        If you want to send me a message feel free to fill out the form below to send me an email! Any messages are welcome, be it advice, hate mail, miscellaneous inquiries or a quick hello!

      </div>
      <br/>
      <br/>
      <div className="Form">
        <Form/>
      </div>
    </div>)
  }
}

export default ContactMe
