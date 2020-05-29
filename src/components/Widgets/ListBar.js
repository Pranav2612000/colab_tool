import React, { useState } from 'react';
import {Navbar, Button} from 'react-bootstrap';
const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar style={{backgroundColor:"white"}} >
    <Navbar.Brand>{props.title}</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
        <Button style={{backgroundColor:"blue"}} onClick={props.moveCallback}>M</Button>
        <Button style={{backgroundColor:"#12cc15",marginLeft:"5%"}} variant = "success" onClick={props.addCardCallback}>+</Button>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Example;