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
    console.log(props.board);
    let board_list = props.board.list;
    if(board_list == undefined) {
      board_list = [];
    }
    var check = -1;
    for(let i=0;i<board_list.length;i++){
        if(board_list[i].title == newListName){
          check = i;
          break;
        }
    }
    console.log("check in List:" + check);
    if(check != -1){
        alert("List already exists!");
        return;
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
      <span >
        <Navbar style={{backgroundColor:"#c6c6f7",borderTopWidth:0,borderLeftWidth:0,borderRightWidth:0,borderBottomWidth:"2px"}} collapseOnSelect expand="lg" bg="white" variant="light">
          <Navbar.Brand style={{color:"#5340c9",marginLeft:"45%",fontSize:"2.5vh",fontStyle:"bold",fontFamily:"Arial"}} >Task name:{props.title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav> 
              <Nav.Link style={{color:"#5340c9",fontSize:"2vh"}} onClick={toggle}>Add List</Nav.Link>
              <Nav.Link style={{color:"#5340c9",fontSize:"2vh"}} >
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