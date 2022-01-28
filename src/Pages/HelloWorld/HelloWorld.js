import React from 'react'
import './HelloWorld.css'

<<<<<<< HEAD
import {Text} from '../../components/shared';

const HelloWorld = (props) => {
  return (
    <div className="App">
      
       {/* <Label>Hello</Label> */}
       {/* <Button /> */}
       <Text variant="smText"  color="primaryColor" />
       <Text variant="mdText" color="primaryColor"/>
       <Text variant="lgText" color="primaryColor"/>
      
=======
import {Heading,SelectItem,SelectGroup,Input,Button,Label} from '../../components/shared';
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
       <Input
              type="textarea"
              placeholder="name"
           />
           <Input
               placeholder="name"
           />
        <Button size="md" variant="btnPrimary">
             Hello
            </Button>
            <Heading headingText="Hello Feedback" type="h1"  />
            <SelectGroup>
          <SelectItem>-- Select --</SelectItem>
          <SelectItem>1</SelectItem>
          <SelectItem>2</SelectItem>
        </SelectGroup>
>>>>>>> 3c5a769bab16e63172b8d89247e89221dc2d1895
    </div>
  );
}

export default HelloWorld
