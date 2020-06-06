import React from "react";
import "./Pins.css";
import { Container } from "react-bootstrap";
import Pin from "./Pin/Pin";

const Pins = (props) => {
  console.log("Render Pins", props);
  return (
    <Container>
      {props.pins.map((pin) => (
        <Pin {...pin} key={pin.src} />
      ))}
    </Container>
  );
};

export default Pins;
