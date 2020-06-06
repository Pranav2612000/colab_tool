//import React from "react";
import ReactDOM from "react-dom";
//import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import {Link} from 'react-router-dom';
import LoginForm from "../Widgets/LoginForm";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card } from "@material-ui/core";
import logo from "./logo.png"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: "auto",
    marginTop:"10%",
    backgroundColor: "blue",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <div style={{height:"100%",width:"100%",display:"flex",flexDirection:"row"}} >
    <div style={{height:"100%",width:"60%"}} >
      <img src={logo} style={{height:"60%",width:"50%",marginTop:"20%"}} ></img>
    </div>
    <div style={{height:"100%",width:"40%"}} >
      <CssBaseline />
      <Card style={{width:"70%",height:"70%",marginTop:"20%",marginLeft:"15%"}} >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
                  <LoginForm />
                  <div style={{marginTop:"2%"}} >
              <Link to="/signup" style={{marginTop:"2%"}} >Sign me Up!</Link>
                </div>
              </Card>
        
    </div>
    </div>
  );
}
//export default App;
