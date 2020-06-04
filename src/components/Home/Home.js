import React from "react";
import "./Home.css";
import Parse from "parse";
import { Container } from "react-bootstrap";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonLoading: false,
      usernameError: false,
      passwordError: false,
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (event) => {
    const name = event.target.getAttribute("id");
    const value = event.target.value;
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
      await Parse.User.logIn(this.state.username, this.state.password);
      console.log("Logged in!");
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    console.log("Home: render");
    if (!Parse.User.current()) {
      console.log("Home: not logged in.")
      this.props.history.push("/login");
    }

    return (
      <section id="home">
        <Container>
          Hoooowdy
        </Container>
      </section>
    );
  }
}

export default Home;
