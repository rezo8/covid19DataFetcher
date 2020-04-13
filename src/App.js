import React, {Component} from 'react';
import './App.css';
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";
import Header from "./Header.js"
import AboutMe from "./AboutMe.js"
import ContactMe from "./ContactMe.js"
import IsItFlat from "./IsItFlat.js"

const CORE = {
  "About Me": <AboutMe/>,
  "Contact Me": <ContactMe/>,
  "IsItFlat": <IsItFlat/>,
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeSite: "IsItFlat"
    }
  }

  componentWillMount() {}
  render() {
    const body = CORE[this.state.activeSite]
    console.log(body);
    return (<div className="App">
      <div>
        < Header changeSelected={this.changeSelected.bind(this)}/>
      </div>
      <div className="textChunk">
        {body}
      </div>
      <br/>
      <br/>
    </div>);

  }

  changeSelected(key) {
    this.setState({activeSite: key})
  }

}

export default App;
