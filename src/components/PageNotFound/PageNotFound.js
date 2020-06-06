import React from "react";
import "./PageNotFound.css";
import { Container } from "react-bootstrap";

function PageNotFound(props) {
  console.log("Profile: render");

  // let history = useHistory();

  // if (!Parse.User.current()) {
  //   console.log("Profile: not logged in.");
  //   history.push("/login");
  // }

  return (
    <section id="PageNotFound">
      <Container>
        It appears there is nothing here :/
      </Container>
    </section>
  );
}

export default PageNotFound;
