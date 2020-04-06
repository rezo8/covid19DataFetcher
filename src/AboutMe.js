import React, {Component} from 'react';
import './App.css';
import {PageHeader} from 'react-bootstrap';

class AboutMe extends Component {

  render() {
    return (<div >
      <div className="Center">
        <PageHeader>
          Hey! My name is Ribhi El-Zaru.
        </PageHeader>
      </div>
      <br/>
      <p>
        First of all, thaks for checking out my website! I&#39;m a developer from the great city of Boston, MA. Proudly, this is the beginning of my website! I&#39;ve always been a fan of the ReactJS platform, and decided to flex (haha, get it) and use it to code my own Portfolio from scratch. On this website, I talk about some coding projects I have embarked on, as well as the hobbies that make me who I am. But first, a few things about myself.
      </p>
      <br/>
      <p>
        I was born Michigan and raised across the North-East and have spent many stints living in Jordan and Palestine where most of my extended family resides. I was lucky enough to spend my Junior and Senior years of High School at the illustrious King&#39;s academy in Madaba, Jordan. After which, I went to college at Boston College with little to no plan as to what I wanted to do with myself, let alone my major. But my urge to take a Computer Science class taught by one of my close friend&#39;s father as well as a fateful meeting with Harris Williams in the Spring of 2016 led me down the path of Computer Science. I am most comfortable coding in Java and Python, but love to learn new technologies! Which is why I&#39;ve taken various stabs at working with the React framework.
      </p>
      <br/>
      Anyways I hope you like my site, but before you leave and/or explore my website here is my favorite picture of myself, as created by a true homie, the talented Brandon Navon.
      <br/>
      <br/>
    </div>)
  }
}

export default AboutMe
