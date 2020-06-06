import React, { useState } from 'react';
import {Navbar, Button} from 'react-bootstrap';
import DragIndicator from '@material-ui/icons/DragIndicator';

const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar style={{backgroundColor: props.color}} >
    <Navbar.Brand>{props.title}</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
        <Button style={{backgroundColor:"blue"}} onClick={props.moveCallback}><i class="fa fa-arrows" aria-hidden="true" style={{color:"white"}} ></i></Button>
        <Button style={{backgroundColor:"#12cc15",marginLeft:"5%"}} variant = "success" onClick={props.addCardCallback}><i class="fa fa-plus" style={{color:"black"}} aria-hidden="true"></i></Button>
    </Navbar.Collapse>
  </Navbar>
  );
}

export default Example;