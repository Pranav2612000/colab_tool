import React from "react";
import ReactDOM from "react-dom";
import Draggable , {DraggableCore} from 'react-draggable';
import Sidebar from "react-sidebar";
import Header from "./Header";
import MaterialTitlePanel from "./MaterialTitlePanel";
import SidebarContent from "./SidebarContent";
import Workspace from "./Workspace";
import {Jumbotron} from 'reactstrap';
import {Container, Row, Col} from 'react-bootstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { red } from "@material-ui/core/colors";


const styles = {
  contentHeaderMenuLink: {
    textDecoration: "none",
    color: "white",
    padding: 8
  },
  content: {
    padding: "16px"
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open1:false,
      anchorEl:null,
      isDraggable: true,
      docked: false,
      open: false,
      transitions: true,
      touch: true,
      shadow: true,
      pullRight: false,
      touchHandleWidth: 20,
      dragToggleDistance: 30
    };
    
    this.renderPropCheckbox = this.renderPropCheckbox.bind(this);
    this.renderPropNumber = this.renderPropNumber.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.preventListDrag = this.preventListDrag.bind(this);
  }

  preventListDrag() {
    console.log("preventing");
    this.setState({
      isDraggable: !this.state.isDraggable 
    });
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  menuButtonClick(ev) {
    ev.preventDefault();
    this.setState({
      open:!this.state.open
    })
    //this.onSetOpen(!this.state.open);
  }

  renderPropCheckbox(prop) {
    const toggleMethod = ev => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <label htmlFor={prop}>
          <input
            type="checkbox"
            onChange={toggleMethod}
            checked={this.state[prop]}
            id={prop}
          />
          {prop}
        </label>
      </p>
    );
  }

  renderPropNumber(prop) {
    const setMethod = ev => {
      const newState = {};
      newState[prop] = parseInt(ev.target.value, 10);
      this.setState(newState);
    };

    return (
      <p key={prop}>
        {prop}{" "}
        <input type="number" onChange={setMethod} value={this.state[prop]} />
      </p>
    );
  }

  /*handleChange = (event) => {
    setAuth(event.target.checked);
  };*/
  handleMenu = (event) => {
    this.setState({
      anchorEl:event.currentTarget,
      open1:!this.state.open1
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl:!this.state.anchorEl,
      open1:!this.state.open1
    })
  };
  makeStyles= (theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });
  render() {
    const sidebar = <SidebarContent />;
    const classes = this.makeStyles;
    const contentHeader = (
      <span onClick={this.menuButtonClick}>
        {!this.state.docked && (
          <a
            onClick={this.menuButtonClick}
            href="#"
            style={styles.contentHeaderMenuLink}
          >
            =
          </a>
        )}
        <span></span>
      </span>
    );

    const sidebarProps = {
      sidebar,
      docked: this.state.docked,
      sidebarClassName: "custom-sidebar-class",
      contentId: "custom-sidebar-content-id",
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen
    };

    return (
        <Sidebar {...sidebarProps}>
          <div className={classes.root} style={{backgroundColor:"red"}} >
      
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={this.menuButtonClick} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          TASK MANAGEMENT SYSTEM
            <div style={{width:"65vw",marginLeft:"14vw"}} >
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                style={{marginLeft:"67vw"}}
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.open1}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
          <Jumbotron>
        <h1 className="display-3">Welcome !</h1>
        <p className="lead">Press the Hamburger icon or the menu button in the navbar to navigate to different boards(Some features are still being developed)</p>
        <hr className="my-2" />
        <p>On the board page, press the button labelled "M" to start movement of the lists. You can then move them freely.</p>
        <p>Press the '+' labelled button to add buttons to cards. </p>
        <p className="lead">
        </p>
      </Jumbotron>
        </Sidebar>
    );
  }
}
export default App;
