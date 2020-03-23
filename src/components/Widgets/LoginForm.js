import React from "react";
import { Button } from "reactstrap";
import {Redirect} from 'react-router';
import axios from 'axios';
import { AvForm, AvField } from "availity-reactstrap-validation";
import {Spinner} from 'react-bootstrap';
import url from '../../links';

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

  handleInvalidSubmit = (event, errors, values) => {
    this.setState({ email: values.email, error: true });
    console.log(`Login failed`);
  };

  render() {
      if(this.state.op_succ) {
          return(
              <Redirect to="/home"/>
          );
      }
    return (
      <AvForm
        onValidSubmit={this.handleValidSubmit}
        onInvalidSubmit={this.handleInvalidSubmit}
      >
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
          }}
        />
        <Button id="submit">
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