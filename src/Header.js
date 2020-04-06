import React, {Component} from 'react';
import {Navbar, NavItem, Nav, MenuItem, NavDropdown} from "react-bootstrap";
import './App.css';
class Header extends Component {

  handleSelect(selectedKey) {
    console.log(selectedKey)
    this.props.changeSelected(selectedKey);
  }

  render() {
    return (<Navbar>
      <Nav className="navbar navbar-dark bg-dark" onSelect={this.handleSelect.bind(this)}>
        <NavItem eventKey={"Is it Flat?"} href="#">
                  Is it Flat?
        </NavItem>
        <NavItem eventKey={"About Me"}>
          About Me
        </NavItem>
        <NavItem eventKey={"Contact Me"} href="#">
          Contact Me
        </NavItem>


      </Nav>
    </Navbar>)
      }
        }

export default Header