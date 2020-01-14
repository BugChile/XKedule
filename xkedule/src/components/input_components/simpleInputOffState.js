import React from "react";

// Simple placeholder for an input which return some summary of it's state via
// text. It receives css classes (props.className) and one text input (props.text)
//
// It's main css class (not necessary to pass it through props) is .simple_input_off_state

export default function SimpleInputOffState(props) {
  return (
    <div className={"simple_input_off_state " + props.className}>
      {props.text}
    </div>
  );
}
