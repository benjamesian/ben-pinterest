import React from "react";
import "./CreatePinBtn.css";
import { useHistory } from "react-router-dom";

function CreatePinBtn(props) {
  let history = useHistory();
  if (!props.user) {
    return null;
  }
  return (
    <button id="create-pin-btn" onClick={() => history.push("/pin-builder")}>
      <i className="material-icons">add</i>
    </button>
  );
}

export default CreatePinBtn;
