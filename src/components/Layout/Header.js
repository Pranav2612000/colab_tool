import React, {useState} from 'react';
import {NavDropdown, Form, Button, FormControl, Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
const Header = (props) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Brand href="#home">Board Title</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
      {/*
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
      */}
    <Nav> 
      <Nav.Link href="#deets">Add List</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
          Add Colloborators
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}

export default Header;