import React from "react";
//import { Button } from "reactstrap";
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router';
import axios from 'axios';
import { AvForm, AvField } from "availity-reactstrap-validation";
import {Spinner} from 'react-bootstrap';
import url from '../../links';
import { makeStyles } from '@material-ui/core/styles';

export default class LoginForm extends React.Component {
  constructor(props) {
    localStorage.removeItem('colab-tool-token');
    super(props);
    this.state = {
        username: '',
        password: '',
        loading: false,
        op_succ: false,
    };
  }
  
  handleValidSubmit = (event, values) => {
    this.setState({
        loading: true
    });
    let reqData = {
        username: values.username,
        password: values.password
    };
    axios.post(url + "login/auth/", reqData)
    .then(res => {
        localStorage.setItem('colab-tool-token', res.data.token);
        console.log(localStorage.getItem('colab-tool-token'));
        this.setState({
            username: '',
            password: '',
            loading: false,
            op_succ: true
        });
    })
    .catch(err => {
        console.log(err);
        alert("Error Logging In");
    })
    console.log(`Login Successful`);
  };
  makeStyles= (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: "auto",
    },
  });
  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
    console.log(`Login failed`);
  };

  render() {
    const classes = this.makeStyles;
      if(this.state.op_succ) {
          return(
              <Redirect to="/home"/>
          );
      }
    return (
      <AvForm
        style={{marginTop:"2vh"}}
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
        <p style={{textAlign:"left",marginLeft:"17%"}} >Username</p>
        <AvField
          name="username"
          type="text"
          validate={{
            required: true,
          }}
          style={{width:"20vw",marginLeft:"5vw"}}
        />
        <p style={{textAlign:"left",marginLeft:"17%"}} >Password</p>
        <AvField
          name="password"
          type="password"
          validate={{
            required: {
              value: true,
              errorMessage: "Please enter your password"
            },
          }}
          style={{width:"20vw",marginLeft:"5vw"}}
        />
        <Button
            type="submit"
            id="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{marginTop:"2vh"}}
          >
            { this.state.loading ? (
            <Spinner animation="border" />
        ) : (
            <span>Login</span>
        )}
          </Button>
      </AvForm>
    );
  }
}
