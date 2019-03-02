import React from "react"

// Simple input for text, can load and save information. Receives:
//     - props.id:            (optional) id for main div
//     - props.value:         (optional) value holder, format bellow
//     - props.save_callback: (optional) callback to save value changes whith
//                             same format as value. Needed if props.value is passed
//     - props.css_classes:   (optional) additional css classes. Main class is
//                            .text_line_input
//     - props.placeholder:   (optional) input placeholder
//
// Value format:
//     {
//      value:          "text value",
//      result_summary: "text value" (same as value)
// }

export default class TextLineInput extends React.PureComponent {
    constructor(props){
        super(props)
        if (!props.value) {
            this.mode = "independent" // component saves the value
            this.state = {
                value: "",
            }
        } else {
            this.mode = "comunicator" // component doesn't save the value
        }

        this.auto_complete = "off"
        if (props.auto_complete) {
            this.auto_complete = props.auto_complete;
        }


        this.handleChange = this.handleChange.bind(this);
        this.setValue = this.setValue.bind(this);
        this.getValue = this.getValue.bind(this);
    };

    setValue(value){
        this.setState({value})
    }

    getValue(){
        if (this.mode === "comunicator") {
            return this.props.value;
        } else {
            return this.state.value;
        }
    }

    handleChange(event){
        if (this.mode === "comunicator") {
            this.props.save_callback(event.target.value);
        } else {
            this.setValue(event.target.value)
        }
    }

   render() {
       if (this.mode === "comunicator") {
           return(
               <input id={this.props.id}
                      className={"text_line_input "+this.props.css_classes}
                      value={this.props.value}
                      onChange={this.handleChange}
                      autoComplete={this.auto_complete}>
               </input>
           )
       } else {
           return(
               <input id={this.props.id}
                      className={"text_line_input "+this.props.css_classes}
                      value={this.state.value}
                      onChange={this.handleChange}
                      autoComplete={this.auto_complete}>
               </input>
           )
       }

    }
}
