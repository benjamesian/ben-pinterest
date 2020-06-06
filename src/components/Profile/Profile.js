import React, { Component } from "react";
import "./Profile.css";
import Parse from "parse";
import { Container, Image } from "react-bootstrap";
import Pins from "../Pins/Pins";

class Profile extends Component {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pins: [],
    };

    this.deletePinHandler = props.deletePinHandler.bind(this);
  }

  async componentDidMount() {
    this.mounted = true;
    console.log("Attempting to fetch profile info.");

    try {
      const userQuery = new Parse.Query(Parse.User);
      userQuery.equalTo("username", this.props.username);
      const user = await userQuery.first();

      const Pin = Parse.Object.extend("Pin");
      const pinsQuery = new Parse.Query(Pin);
      pinsQuery.equalTo("pinAuthor", user.toPointer());
      const pins = await pinsQuery.find();
      const pinObjects = pins.map((pin) => ({
        deleteHandler: this.deletePinHandler,
        pinId: pin.id,
        authorId: pin.get("pinAuthor").id,
        src: pin.get("imageFile").url(),
        title: pin.get("title"),
        description: pin.get("description"),
        destinationLink: pin.get("destinationLink"),
      }));

      if (this.mounted) {
        this.setState({ pins: pinObjects });
      }
    } catch (e) {
      console.log("Could not load profile for username=" + this.props.username);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    console.log("Profile: render", this.state);

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
          <Pins pins={this.state.pins} />
        </Container>
      </section>
    );
  }
}

export default Profile;
