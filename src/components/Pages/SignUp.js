import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";
import SignUpForm from "../Widgets/SignUpForm";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col />
          <Col lg="8">
            <Jumbotron>
              <h3>
                <u>Sign Up</u>
              </h3>
              <hr />
              <Card>
                <CardBody>
                  <SignUpForm />
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
