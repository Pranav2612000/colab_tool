/*
1)Preventing duplicate usernames
2)Input validation
3)Proper changing of input values etc
 */
import React from "react";
//import { Button } from "reactstrap";
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router';
import axios from 'axios';
import { AvForm, AvField } from "availity-reactstrap-validation";
import {Spinner} from 'react-bootstrap';
import url from '../../links';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        password: '',
        repassword: '',
        username: '',
        loading: false,
        op_success: false
    };
  }

  handleValidSubmit = (event, values) => {
    this.setState({
        loading: true
    });
    if(values.password != values.repassword) {
        alert("Passwords Do Not Match");
        return;
    }
    let reqData = {
        username: values.username,
        password: values.password,
        name: values.name,
    };
    axios.post(url + "login/register/",reqData)
    .then(res => {
        if(res.status == 200) {
            //alert("User Added Successfully!");
            this.setState({
                username: values.username,
                password: values.password,
                name: values.name,
                loading: false,
                op_success: true
            });
        } else {
            alert("Error:" + res.err);
        }
    })
    .catch(err => {
        console.log(err);
        alert(err);
    })
    console.log(reqData);
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
      if(this.state.op_success) {
          return (
              <Redirect to="/login"></Redirect>
          );
      }
    return (
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
        <p style={{textAlign:"left",marginLeft:"17%"}} >Name</p>
        <AvField
          name="name"
          type="text"
          validate={{
            required: true,
          }}
          style={{width:"20vw",marginLeft:"5vw"}}
        />
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
            pattern: {
              value: "^[A-Za-z0-9]+$",
              errorMessage:
                "Your password must be composed only with letter and numbers"
            },
            minLength: {
              value: 6,
              errorMessage: "Your password must be between 6 and 16 characters"
            },
            maxLength: {
              value: 16,
              errorMessage: "Your password must be between 6 and 16 characters"
            }
          }}
          style={{width:"20vw",marginLeft:"5vw"}}
        />
        <p style={{textAlign:"left",marginLeft:"17%"}} >Confirm Password</p>
        <AvField
          name="repassword"
          type="password"
          validate={{
            required: true,
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
            <span>Sign Up</span>
        )}
        </Button>
      </AvForm>
    );
  }
}