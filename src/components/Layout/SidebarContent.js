import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import { Container, ModalFooter, Modal, ModalBody, Alert , ModalHeader, Form, FormGroup, Input, Button, Label, InputGroup } from 'reactstrap';
import axios from 'axios';
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitlePanel";
import { withRouter } from "react-router-dom";
import Logout from "../Widgets/Logout";
import url from "../../links";
import {Spinner} from 'react-bootstrap'

const styles = {
  sidebar: {
    width: 800,
    height: "90vh",
    marginTop: "35%"
  },
  sidebarLink: {
    display: "block",
    padding: "16px 0px",
    color: "#757575",
    textDecoration: "none"
  },
  divider: {
    margin: "8px 0",
    height: 1,
    backgroundColor: "#757575"
  },
  content: {
    height: "100%",
    marginTop: "64px",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const {className} = props;
  const [loading,setLoading]=useState(false);
  const [personalBoardsList, setPersonalBoardsList] = useState([]);
  const [teamBoardsList, setTeamBoardsList] = useState([]);
  const [personalToggle, setPersonalToggle] = useState(false);
  const [teamToggle, setTeamToggle] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [selectedcolor, setColor] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(url + "user/getboards/", {
        headers: { 'colab-tool-token': localStorage.getItem("colab-tool-token") }
      })
        .then(res => {
          console.log(res);
          console.log(res.data.userBoards[0].personalBoards);
          setPersonalBoardsList(res.data.userBoards[0].personalBoards)
          setTeamBoardsList(res.data.userBoards[0].teamBoards);
        })
        .catch(err => {
          console.log(err);
        })
    };
    fetchData();
  }, []);

  const personalLinks = [];
  for (let ind = 0; ind < personalBoardsList.length; ind++) {
    personalLinks.push(
      <div><Link to={"/boards/" + personalBoardsList[ind]}>{personalBoardsList[ind]}</Link></div>
    );
  }
  personalLinks.push(
    <Link onClick={toggle}>Add New Board</Link>
  )
  console.log(personalLinks);

  async function addBoard() {
    let board_name = newBoardName;
    let color = selectedcolor;
    console.log(color);
    console.log(board_name);
    setLoading(true);
    var reqData = {
      boardname: board_name,
      boardcolor: color
    };
    var history = props.history;
    await axios.post(url + "user/addpersonalboards/", reqData, {
      headers: { 'colab-tool-token': localStorage.getItem("colab-tool-token") },
      body: reqData
    })
    .then(res => {
      console.log(res);
      if(res.status == 200) {
        setLoading(false)
        console.log("success");
        toggle();
        setPersonalBoardsList([...personalBoardsList, board_name])
        history.push("/boards/" + board_name);
      } else {
        setLoading(false);
        Alert("Something went wrong");
      }
    })
    .catch(err => {
      setLoading(false);
      Alert("Something went wrong");
    })
  }
  function viewPersonalBoards() {
    setPersonalToggle(!personalToggle);
  }

  function viewTeamBoards() {
    setTeamToggle(!teamToggle);
  }

  return (
    <div style={{height: '100%', overflow: 'hidden'}}>
      <div style={styles.content} >
      <Link to={{pathname:"/Allboards"}} /*component={}*/>
          <Button style={{width:"100%",backgroundColor:"white"}} ><span style={styles.sidebarLink}>
            <p style={{ color: "black", fontSize: "2vh" }} >View Boards</p>
          </span>
          </Button>
        </Link>
        <div style={{ height: 0, width: "100%", border: "2px solid blue", borderBottomWidth: "2px", borderTopWidth: "0px", borderRightWidth: "0px", borderLeftWidth: "0px" }} ></div>
        <Link path='/' /*component={}*/>
          <span style={styles.sidebarLink} onClick={viewPersonalBoards}>
            <p style={{ color: "black", fontSize: "2vh" }} >Personal Boards</p>
          </span>
        </Link>
        {personalToggle ? (
          <span>{personalLinks}</span>
        ) : (
            <span></span>
          )}
        <div style={{ height: 0, width: "100%", border: "2px solid blue", borderBottomWidth: "2px", borderTopWidth: "0px", borderRightWidth: "0px", borderLeftWidth: "0px" }} ></div>
        <Logout text={"Logout"} />
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <Form>
            <ModalHeader toggle={toggle}>Add Board</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="boardname">New Board Name:</Label>
                <Input
                  type="text"
                  name="board_name"
                  id="board_name"
                  placeholder="Enter new board name"
                  value={newBoardName}
                  onChange={e => setNewBoardName(e.target.value)}
                />


                <Label for="radio">Select color</Label>

                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                    name="color" 
                    id="#f29891"
                    value={selectedcolor}
                    placeholder="Red1"
                    onChange={e => setColor(e.target.id)} 
                    />{' '}
                  <span style={{color:"red"}}>Red</span>
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                    name="color" 
                    id="#66e861"
                    value={selectedcolor}
                    placeholder="Green1"
                    onChange={e => setColor(e.target.id)} 
                    />
                    <span style={{color:"green"}}>Green</span>
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" 
                    name="color" 
                    id="#5d8ae3"
                    value={selectedcolor}
                    placeholder="Green1"
                    onChange={e => setColor(e.target.id)} 
                    />
                    <span style={{color:"blue"}}>Blue</span>
                  </Label>
                </FormGroup>

              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={addBoard}>
                Confirm
            </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
            </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default withRouter(SidebarContent);
