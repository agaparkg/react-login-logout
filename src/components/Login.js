import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../styles/Login.css";

class Login extends Component {
  render() {
    const customStyle = { textAlign: "center" };
    const { fieldsEmpty, userNotFound, handleFormSubmit } = this.props;

    return (
      <div className="login">
        <h2 style={customStyle}>Login Page</h2>
        {fieldsEmpty ? (
          <div className="error">Please fill the fields first!</div>
        ) : null}
        {userNotFound ? (
          <div className="error">User not found in our system!</div>
        ) : null}

        <Form onSubmit={handleFormSubmit}>
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>{" "}
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
