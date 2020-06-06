import React from "react";
import "./Home.css";
import { Container } from "react-bootstrap";
import Parse from "parse";
import Pins from "../Pins/Pins";

class Home extends React.Component {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pins: [],
    };

    this.deletePinHandler = props.deletePinHandler.bind(this);
    this.editPinHandler = props.editPinHandler.bind(this);
  }

  async componentDidMount() {
    this.mounted = true;

    try {
      const Pin = Parse.Object.extend("Pin");
      const pinsQuery = new Parse.Query(Pin);
      const pins = await pinsQuery.find();
      const pinObjects = pins.map((pin) => ({
        deleteHandler: this.deletePinHandler,
        editHandler: this.editPinHandler,
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
      console.log("Failed to load pins");
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    console.log("Home: render");

    return(
      <section id="home">
        <Container>
          <Pins pins={this.state.pins} />
        </Container>
      </section>
    );
  }
}

export default Home;
