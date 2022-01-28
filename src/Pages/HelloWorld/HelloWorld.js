import React from 'react'
import './HelloWorld.css'

import {Text} from '../../components/shared';

const HelloWorld = (props) => {
  return (
    <div className="App">
      
       {/* <Label>Hello</Label> */}
       {/* <Button /> */}
       <Text variant="smText"  color="primaryColor" />
       <Text variant="mdText" color="primaryColor"/>
       <Text variant="lgText" color="primaryColor"/>
      
    </div>
  );
}

export default HelloWorld
