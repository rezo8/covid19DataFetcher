import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, Dropdown, MenuItem} from 'react-bootstrap'
class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}

class CustomMenu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;
    //TODO figure out how to make filtering not type sensitive

    return (
      <div className="dropdown-menu" style={{ padding: '' }}>
        <FormControl
          ref={c => {
            this.input = c;
          }}
          type="text"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child => !value.trim() || child.props.children.indexOf(value) !== -1
          )}
        </ul>
      </div>
    );
  }
}

export default class CountrySelector extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            countryList: ["USA"]
        }

    }
    componentDidMount(){
        const thisRef = this
        this.props.apiRef.getCountries(function(body){
            thisRef.setState({countryList : body.response})
        })
    }

    render(){
        const thisRef = this
        let countries = this.state.countryList.map((val, index)  => (
            <MenuItem eventKey={index} onClick={e => thisRef.props.updateCountry(val)} value={val}>{val}</MenuItem>
        ))
        return (
          <Dropdown id="dropdown-custom-menu">
            <CustomToggle bsRole="toggle">Select Country</CustomToggle>

            <CustomMenu bsRole="menu">
              {countries}
            </CustomMenu>
          </Dropdown>
          )
    }

}