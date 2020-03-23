import React, {useState} from 'react';
import axios from 'axios';
import {Container, ModalFooter, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import url from '../../links';
const Header = (props) => {
  const {className} = props;
  const [modal, setModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const toggle = () => setModal(!modal);
  const addList = async () => {
    let board_list = props.board.list;
    if(board_list == undefined) {
      board_list = [];
    }
    board_list.push({
      cards: [],
      pos: { X: 200, Y: 200},
      title: newListName
    });
    console.log(board_list);
    var reqData = {
      creator: props.creator,
      boardname: props.title,
      board_list: board_list
    };
    await axios.post(url + "board/addboard/",reqData, {
      headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
      body: reqData
    })
    .then(res => {
      console.log(res);
      if(res.status == 200) {
        console.log("success");
        window.location.reload();
      } else {
        console.log("Something went wrong");
      }
    })
    .catch(err => {
      console.log(err);
    })
    console.log(newListName);
    console.log(props.board);
  }
  return (
      <span>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Navbar.Brand>{props.title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav> 
              <Nav.Link onClick={toggle}>Add List</Nav.Link>
              <Nav.Link>
                  Add Colloborators
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form>
          <ModalHeader toggle={toggle}>Add List</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="listname">New List Name:</Label>
              <Input
                type="text"
                name="list_name"
                id="list_name"
                placeholder="Enter new list name"
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={addList}>
              Confirm
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </span>
    );
}

export default Header;