import React from 'react'
import { Sidenav } from '../../components/shared';
// import Login from '../Login';
// import StyleGuide from '../StyleGuide/StyleGuide';
import './HelloWorld.css'

const HelloWorld = (props) => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Heading headingType='h3'>hello</Heading>
      </header> */}
      {/* <StyleGuide /> */}
     <Sidenav/>
    </div>
  );
}

export default HelloWorld;
