import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import TextareaAutosize from "react-autosize-textarea";
import "./EditComment.css";

class EditComment extends Component {
  constructor() {
    super();
    this.state = { commentShine: false };
  }

  onBlurHandler = () => {
    this.setState({ commentShine: false });
    console.log("unblur");
  };
  onFocusHandler = () => {
    this.setState({ commentShine: true });
    console.log("focus");
  };
  onChange = e => {
    this.props.inputHandler("changeComment", e.target.value);
  };
  render() {
    return (
      <div style={{ width: "320px", height: "250px", fontSize: "8pt" }}>
        <Scrollbars
          id="commentScroll"
          autoHeight
          autoHeightMin={100}
          autoHeightMax={200}
          className={this.state.commentShine ? "commentShine" : ""}
        >
          <TextareaAutosize
            id="commentTextArea"
            defaultValue={this.props.Items.comment}
            onChange={this.onChange}
            onFocus={this.onFocusHandler}
            onBlur={this.onBlurHandler}
            rows={6}
          />
        </Scrollbars>
      </div>
    );
  }
}

export default EditComment;
