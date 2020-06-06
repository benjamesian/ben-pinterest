import React from "react";
import "./Pin.css";
import { Container, Card } from "react-bootstrap";
import Parse from "parse";

const Pin = (props) => {
  console.log("Render Pin", props);

  let deleteBtn = null;
  if (props.deleteHandler && Parse.User.current().id === props.authorId) {
    deleteBtn = (
      <button onClick={props.deleteHandler.bind(null, props.pinId)}>
        <i className="material-icons">close</i>
      </button>
    );
  }
  let editBtn = null;
  if (props.editHandler && Parse.User.current().id === props.authorId) {
    editBtn = (
      <button onClick={props.editHandler.bind(null, props)}>
        edit
      </button>
    );
  }
  return (
    <Container>
      {deleteBtn}
      {editBtn}
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={props.src}
          onLoad={() => URL.revokeObjectURL(props.src)}
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.description}</Card.Text>
          <Card.Link>{props.link}</Card.Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Pin;
