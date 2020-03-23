/*
1)Preventing duplicate usernames
2)Input validation
3)Proper changing of input values etc
 */
import React from "react";
import { Button } from "reactstrap";
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
            alert("User Added Successfully!");
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

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
    console.log(`Login failed`);
  };

  render() {
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
        <AvField
          name="name"
          label="Name"
          type="text"
          validate={{
            required: true,
          }}
        />
        <AvField
          name="username"
          label="Username"
          type="text"
          validate={{
            required: true,
          }}
        />
        <AvField
          name="password"
          label="Password"
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
        />
        <AvField
          name="repassword"
          label="Re-enter Password"
          type="password"
          validate={{
            required: true,
          }}
        />
        <Button id="submit">
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