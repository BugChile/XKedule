import React from "react";

// Simple input for text, can load and save information. Receives:
//     - props.value:         (optional) value holder
//     - props.onChange: (optional) callback to save value changes whith
//                             same format as value. Needed if props.value is passed
//     - props.className:   (optional) additional css classes. Main class is
//                            .text_line_input
//     - props.placeholder:   (optional) input placeholder
//     - props.enter_key_submit:   (optional) if true, enter key will submit change
//

export default class TextLineInput extends React.PureComponent {
  constructor(props) {
    super(props);
    if (typeof props.value !== "string") {
      this.mode = "independent"; // component saves the value
      this.state = {
        value: ""
      };
    } else {
      this.mode = "messenger"; // component doesn't save the value
    }

    this.auto_complete = "off";
    if (props.auto_complete) {
      this.auto_complete = props.auto_complete;
    }

    this.id = "text_line_input";

    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  setValue(value) {
    this.setState({ value });
  }

  handleChange(event) {
    if (this.mode === "messenger") {
      this.props.onChange(event.target.value);
    } else {
      this.setValue(event.target.value);
    }
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      document.getElementById(this.id).blur();
    }
  }

  render() {
    if (this.mode === "messenger") {
      return (
        <input
          id={this.id}
          placeholder={this.props.placeholder}
          className={"text_line_input " + this.props.className}
          value={this.props.value}
          onChange={this.handleChange}
          autoComplete={this.auto_complete}
          onKeyDown={this.onKeyDown}
        ></input>
      );
    } else {
      return (
        <input
          id={this.id}
          placeholder={this.props.placeholder}
          className={"text_line_input " + this.props.className}
          value={this.state.value}
          onChange={this.handleChange}
          autoComplete={this.auto_complete}
          onKeyDown={this.onKeyDown}
        ></input>
      );
    }
  }
}
