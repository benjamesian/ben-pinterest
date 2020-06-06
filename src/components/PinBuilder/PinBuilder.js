import React from "react";
import "./PinBuilder.css";
import { Button, Form, Container, Col, Row } from "react-bootstrap";
import Parse from "parse";

class PinBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      imageObject: null,
      title: "",
      description: "",
      destinationLink: "",
      imageUrl: "",
    };

    console.log("pb", props);

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
    console.log("Handling pin submission.");
    event.preventDefault();
    try {
      const Pin = Parse.Object.extend("Pin");
      const newPin = new Pin();

      newPin.set(
        {
          pinAuthor: Parse.User.current(),
          ...this.state,
        },
        {
          error: (e) => console.log("Pin missing fields.", e),
        }
      );
      const result = await newPin.save();
      alert("Pin successfully uploaded.");
      console.log("Successful pin upload", result);
    } catch (e) {
      console.log("Pin upload failed.", e);
    }
  };

  handleImage = (e) => {
    console.log("Handle image", e.target.files);
    const file = e.target.files[0];
    const uploadFile = new Parse.File("pic", file);
    this.setState({
      imageFile: uploadFile,
      imageObject: file,
      imageUrl: URL.createObjectURL(file),
    });
  };

  render() {
    console.log("PinBuilder: render");
    let imageArea = null;
    if (this.state.imageObject) {
      imageArea = (
        <div className="media-upload-preview">
          <button onClick={() => this.setState({ imageObject: null })}>
            <i className="material-icons">close</i>
          </button>
          <img
            src={this.state.imageUrl}
            onLoad={() => URL.revokeObjectURL(this.state.imageUrl)}
            alt="user upload preview"
          />
        </div>
      );
    } else {
      imageArea = (
        <input
          id="media-upload-input"
          type="file"
          accept="image/*"
          onChange={this.handleImage}
        />
      );
    }

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Row className="box-form">
            <Col xs="4">
              <div className="media-upload-container">{imageArea}</div>
            </Col>
            <Col xs="8">
              <div className="pin-info-container">
                <Row>
                  <input
                    id="title"
                    placeholder="Title"
                    type="text"
                    onChange={this.changeHandler}
                  />
                </Row>
                <Row>
                  <textarea
                    id="description"
                    placeholder="Description"
                    maxLength="500"
                    onChange={this.changeHandler}
                  />
                </Row>
                <Row>
                  <input
                    id="destinationLink"
                    placeholder="Destination Link"
                    type="text"
                    onChange={this.changeHandler}
                  />
                </Row>
                <Row>
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!(this.state.imageFile && this.state.title)}
                  >
                    Save
                  </Button>
                </Row>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default PinBuilder;
