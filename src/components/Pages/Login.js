import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
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
            </Jumbotron>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}
export default App;
