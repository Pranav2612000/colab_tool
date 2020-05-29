import React,{useState, useEffect} from "react";
import { BrowserRouter, Redirect, Route, Switch , Link} from 'react-router-dom';
import {Container, ModalFooter, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Button, Label} from 'reactstrap';
import axios from 'axios';
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitlePanel";
import Logout from "../Widgets/Logout";
import url from "../../links";

const styles = {
  sidebar: {
    width:500,
    height: "90vh",
    marginTop:"35%"
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
    padding: "16px",
    height: "92.5vh",
    width:"15vw",
    marginTop:"7vh",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const {className} = props;
  const [personalBoardsList, setPersonalBoardsList] = useState([]);
  const [teamBoardsList, setTeamBoardsList] = useState([]);
  const [personalToggle, setPersonalToggle] = useState(false);
  const [teamToggle, setTeamToggle] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(url + "user/getboards/", {
        headers: {'colab-tool-token': localStorage.getItem("colab-tool-token")}
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
    console.log(board_name);
    var reqData = {
      boardname: board_name,
    };
    await axios.post(url + "user/addpersonalboards/",reqData, {
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
  }
  function viewPersonalBoards() {
    setPersonalToggle(!personalToggle);
  }

  function viewTeamBoards() {
    setTeamToggle(!teamToggle);
  }

  return (
    <div>
      <div style={styles.content} >
          <Link path="/" /*component={}*/>
            <span style={styles.sidebarLink}>
              <p style={{color:"black"}} >Profile(In Progress)</p>
            </span>
          </Link>
          <hr style={{backgroundColor:"blue"}}></hr>
          <Link path = '/' /*component={}*/> 
            <span style={styles.sidebarLink} onClick={viewPersonalBoards}>
            <p style={{color:"black"}} >Personal Boards</p>
            </span>
          </Link>
          {personalToggle ? (
              <span>{personalLinks}</span>
            ):(
              <span></span>
            )}
            <hr style={{backgroundColor:"blue"}}></hr>
          <Link exact path="/" /*component={}*/>
            <span style={styles.sidebarLink} onClick={viewTeamBoards}>
            <p style={{color:"black"}} >Team Boards</p>
            </span>
          </Link>
          {teamToggle ? (
              <h4>In Progress</h4>
            ):(
              <span></span>
            )}
            <hr style={{backgroundColor:"blue"}}></hr>
          <Link path="/" /*component={}*/>
            <span style={styles.sidebarLink}>
            <p style={{color:"black"}} >Settings(In Progress)</p>
            </span>
          </Link>
          <hr style={{backgroundColor:"blue"}}></hr>
          <Logout text={"Logout"}/>
      </div>
      <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Form>
          <ModalHeader toggle={toggle}>Add List</ModalHeader>
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

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;