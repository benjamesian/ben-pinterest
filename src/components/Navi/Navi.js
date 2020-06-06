import React from "react";
import "./Navi.css";
import Parse from "parse";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Navi(props) {
  console.log("Navi: render");
  let history = useHistory();
  const user = Parse.User.current();

  const logOut = async (event) => {
    event.preventDefault();
    try {
      await Parse.User.logOut();
      props.onLogOut(null);
      console.log("Logged out!");
      history.push("/login");
    } catch (e) {
      alert("Logout failed", e.message);
    }
  };

  const navElements = [];
  if (user) {
    navElements.push(
      <Nav.Link
        key="profile"
        onClick={() => history.push("/" + user.get("username"))}
      >
        Profile
      </Nav.Link>,
      <Nav.Link key="logout" onClick={logOut}>
        Log Out
      </Nav.Link>
    );
  } else {
    navElements.push(
      <Nav.Link key="login" href="/login">
        Log In
      </Nav.Link>,
      <Nav.Link key="register" href="/register">
        Sign Up
      </Nav.Link>
    );
  }

  return (
    <Navbar collapseOnSelect className="bg-primary">
      <Navbar.Brand className="text-light" onClick={() => history.push("/")}>
        Benterest
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="ml-auto">{navElements}</Nav>
    </Navbar>
  );
}

export default Navi;
