import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import {Link} from 'react-router-dom';
import LoginForm from "../Widgets/LoginForm";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col />
          <Col lg="8">
            <Jumbotron>
              <h3>
                <u>Login Form</u>
              </h3>
              <hr />
              <Card>
                <CardBody>
                  <LoginForm />
                </CardBody>
              </Card>
              <Link to="/signup">Sign me Up!</Link>
            </Jumbotron>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}
export default App;
