import React from 'react'
import './HelloWorld.css'

import {Label} from '../../components/shared';
import {Button} from '../../components/shared';

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
       <Label>Hello</Label>
       <Button className="buttonPrimary">Hello</Button>
      
    </div>
  );
}

export default HelloWorld
