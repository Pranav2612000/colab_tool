import React, {useState} from 'react';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';
import {Container, ModalFooter, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Button, Label, InputGroup} from 'reactstrap';
import { withRouter } from "react-router-dom";
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import url from '../../links';
import './Header.css';
const Header = (props) => {
  const {className} = props;
  const [modal, setModal] = useState(false);
  const [loading,setLoading]= useState(false);
  const [newListName, setNewListName] = useState("");
  const toggle = () => setModal(!modal);
  const delboard= async () => {
    console.log(props.board["boardname"]);
    console.log(props.board.list);
    console.log(props.board);

    let board_list = props.board.list;
    if(board_list == undefined) {
      board_list = [];
    }

    var reqData = {
      creator: props.creator,
      boardname: props.title,
      board_list: board_list
    };
    var history = props.history;
    await axios.post(url + "board/deleteboard/",reqData, {
      headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
      body: reqData
    })
    .then(res => {
      console.log(res);
      if(res.status == 200) {
        setLoading(false);
        console.log("success");
        history.push("/home");
      } else {
        setLoading(false);
        console.log("Something went wrong");
      }
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
    })

  }
  const addList = async () => {
    console.log(props.board);
    setLoading(true);
    let board_list = props.board.list;
    let boardcolor = props.board.boardcolor;
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
      board_list: board_list,
      boardcolor : boardcolor,
    };
    var history = props.history;
    await axios.post(url + "board/addboard/",reqData, {
      headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")},
      body: reqData
    })
    .then(res => {
      console.log(res);
      if(res.status == 200) {
        setLoading(false);
        console.log("success");
        toggle();
        history.push("/boards/" + props.title);
      } else {
        setLoading(false);
        console.log("Something went wrong");
      }
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
    })
    console.log(newListName);
    console.log(props.board);
  }
  return (
    <span style={{backgroundColor:'red'}}>
        <Navbar collapseOnSelect expand="lg" bg="red" variant="light">
          <span style={{'font-size':'145%'}}>
            <i class='fa fa-columns'></i>
            
            {'  ' + props.title}
          </span>
          <Navbar.Brand style={{color:"#5340c9",fontSize:"2.5vh",fontStyle:"bold",fontFamily:"Arial"}} >
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav style={{marginRight:'5%'}}> 
                <Input type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term" value={props.searchText}
                  onChange={e => props.setSearchText(e.target.value)}></Input>
              <button class="btn btn-default" type="submit"><i class="fa fa-search"></i></button>
              <Nav.Link style={{color:"#5340c9",fontSize:"145%", marginRight: '5%', marginLeft:'5%'}} onClick={toggle}>
                <span title='Add List'>
                  <i class='fa fa-calendar-plus'>
                  </i>
                </span>
              </Nav.Link>
              
              <Nav.Link style={{color:"#5340c9",fontSize:"145%"}} onClick={delboard}  >
                <span title='delete board'>
                  <i class='fa fa-trash'></i>
                </span>
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
            {loading?(
            <Spinner animation="border" />
        ) : (
            <span>Confirm</span>
        )}
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

export default withRouter(Header);
