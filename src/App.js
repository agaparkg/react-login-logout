import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
// import { v4 as uuidv4 } from "uuid";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      fieldsEmpty: false,
      token: null,
      userName: "",
      userNotFound: false,
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (token) {
      this.setState({ token: token });
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const emailValue = e.target.email.value;
    const passwordValue = e.target.password.value;

    const credentials = {
      email: emailValue,
      password: passwordValue,
    };

    if (emailValue !== "" && passwordValue !== "") {
      // Authenticate user
      this.authenticateUser(credentials);
    } else {
      this.setState({ fieldsEmpty: true });

      setTimeout(() => {
        this.setState({ fieldsEmpty: false });
      }, 3000);
    }
  };

  authenticateUser = async (creds) => {
    const { email, password } = creds;

    const url =
      "https://630028dd9350a1e548eab35e.mockapi.io/anything/here/v1/users";

    const response = await fetch(url);
    const data = await response.json();

    const user = data.find((d) => d.email === email && d.password === password);

    if (user) {
      const token = "your-token";
      // const token = uuidv4(); // 'fdfadfa-dfadf-dfadf-dsfasdf'
      sessionStorage.setItem("token", token); // JSON.stringify if it is object or array
      this.setState({ token: token, userName: user.fname });
    } else {
      this.setState({ userNotFound: true });

      setTimeout(() => {
        this.setState({ userNotFound: false });
      }, 3000);
    }
  };

  handleLogout = () => {
    sessionStorage.clear();
    this.setState({ token: null });
  };

  render() {
    const { token, fieldsEmpty, userName, userNotFound } = this.state;

    const loginProps = {
      handleFormSubmit: this.handleFormSubmit,
      fieldsEmpty,
      userNotFound,
    };

    const dashboardProps = {
      userName,
      handleLogout: this.handleLogout,
    };
    return (
      <div className="App">
        {token ? <Dashboard {...dashboardProps} /> : <Login {...loginProps} />}
      </div>
    );
  }
}
