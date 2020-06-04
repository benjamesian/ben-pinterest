import React from "react";
import "./Profile.css";
import Parse from "parse";
import { Container, Image } from "react-bootstrap";

function Profile(props) {
  console.log("Profile: render");

  if (!Parse.User.current()) {
    console.log("Profile: not logged in.");
    this.props.history.push("/login");
  }

  return (
    <section id="profile">
      <Container>
        Hoooowdy
        <Image
          src="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
          width="150"
          height="150"
          roundedCircle
        />
      </Container>
    </section>
  );
}

export default Profile;
