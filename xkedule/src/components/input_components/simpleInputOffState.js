import React from "react"

// Simple placeholder for an input which return some summary of it's state via
// text. It receives css classes (props.css_classes) and one text input (props.text)
//
// It's main css class (not necessary to pass it through props) is .simple_input_off_state

export default class SimpleInputOffState extends React.PureComponent {

   render() {
        return(
            <div className={"simple_input_off_state "+this.props.className} >
                    {this.props.text}
            </div>
        )
    }
}
