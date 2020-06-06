import React from "react";
import "./ResetPassword.css";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import Parse from "parse";

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoading: false,
      emailError: false,
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeHandler = (event) => {
    const name = event.target.getAttribute("id");
    const value = event.target.value;
    console.log(value);
    if (!value || value === "") {
      this.setState({
        [`${name}Error`]: true,
      });
    } else {
      this.setState({
        [`${name}Error`]: false,
        [name]: value,
      });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("Attempting password reset.");
      Parse.User.requestPasswordReset(this.state.email);
      alert("Password reset request has been sent to your email!");
    } catch (e) {
      console.log("Error: Password Reset - ", e);
    }
  };

  render() {
    console.log("ResetPassword: render");
    return (
      <section id="ResetPassword">
        <Container>
          <Row>
            <h1>Password Reset</h1>
          </Row>
          <Row className={"box-form"}>
            <Col>
              <Form onSubmit={this.handleSubmit} className={"formLogin"}>
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    required
                    id="email"
                    type="email"
                    onChange={this.changeHandler}
                  />
                  <Form.Control.Feedback
                    className={
                      this.state.emailError ? "displayErrors" : "noError"
                    }
                  >
                    Email is required
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Row>
                  <Button
                    type="submit"
                    className={"btn btn-primary"}
                    disabled={
                      (
                        !this.state.email
                          ? true
                          : false
                      )
                        ? true
                        : false
                    }
                  >
                    Reset Password
                  </Button>
                </Form.Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default ResetPassword;
