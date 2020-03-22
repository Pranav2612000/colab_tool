import React,{useState} from "react";
import { BrowserRouter, Redirect, Route, Switch , Link} from 'react-router-dom';
import PropTypes from "prop-types";
import MaterialTitlePanel from "./MaterialTitlePanel";

const styles = {
  sidebar: {
    width: 256,
    height: "100%"
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
    height: "100%",
    backgroundColor: "white"
  }
};

const SidebarContent = props => {
  const [personalBoardsList, setPersonalBoardsList] = useState([]);
  const [teamBoardsList, setTeamBoardsList] = useState([]);
  const [personalToggle, setPersonalToggle] = useState(false);
  const [teamToggle, setTeamToggle] = useState(false);

  const style = props.style
    ? { ...styles.sidebar, ...props.style }
    : styles.sidebar;

  const links = [];

  for (let ind = 0; ind < 10; ind++) {
    links.push(
      <a key={ind} href="#" style={styles.sidebarLink}>
        Mock menu item {ind}
      </a>
    );
  }
  
  function viewPersonalBoards() {
    setPersonalToggle(!personalToggle);
  }

  function viewTeamBoards() {
    setTeamToggle(!teamToggle);
  }

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <BrowserRouter>
          <Link exact path="/" /*component={}*/>
            <span style={styles.sidebarLink}>
              Profile
            </span>
          </Link>
          <Link exact path = '/' /*component={}*/> 
            <span style={styles.sidebarLink} onClick={viewPersonalBoards}>
              Personal Boards
            </span>
          </Link>
          {personalToggle ? (
              <h4>Showing Personal Boards</h4>
            ):(
              <span></span>
            )}
          <Link exact path="/" /*component={}*/>
            <span style={styles.sidebarLink} onClick={viewTeamBoards}>
              Team Boards
            </span>
          </Link>
          {teamToggle ? (
              <h4>Showing Team Boards</h4>
            ):(
              <span></span>
            )}
          <Link exact path="/" /*component={}*/>
            <span style={styles.sidebarLink}>
              Settings
            </span>
          </Link>
          <Link exact path="/" /*component={}*/>
            <span style={styles.sidebarLink}>
              Logout
            </span>
          </Link>
        </BrowserRouter>
      </div>
    </MaterialTitlePanel>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object
};

export default SidebarContent;