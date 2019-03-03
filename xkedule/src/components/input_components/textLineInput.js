import React from "react"

// Simple input for text, can load and save information. Receives:
//     - props.id:            (optional) id for input div
//     - props.placeholder:   (optional) placeholder for input div
//     - props.value:         (optional) value holder
//     - props.onChange: (optional) callback to save value changes whith
//                             same format as value. Needed if props.value is passed
//     - props.css_classes:   (optional) additional css classes. Main class is
//                            .text_line_input
//     - props.placeholder:   (optional) input placeholder
//

export default class TextLineInput extends React.PureComponent {
    constructor(props){
        super(props)
        if (typeof props.value !== "string") {
            this.mode = "independent" // component saves the value
            this.state = {
                value: "",
            }
        } else {
            this.mode = "messenger" // component doesn't save the value
        }

        this.auto_complete = "off"
        if (props.auto_complete) {
            this.auto_complete = props.auto_complete;
        }


        this.handleChange = this.handleChange.bind(this);
        this.setValue = this.setValue.bind(this);
    };

    setValue(value){
        this.setState({value})
    }

    handleChange(event){
        if (this.mode === "messenger") {
            this.props.onChange(event.target.value);
        } else {
            this.setValue(event.target.value)
        }
    }

   render() {
       if (this.mode === "messenger") {
           return(
               <input id={this.props.id}
                      placeholder={this.props.placeholder}
                      className={"text_line_input "+this.props.css_classes}
                      value={this.props.value}
                      onChange={this.handleChange}
                      autoComplete={this.auto_complete}>
               </input>
           )
       } else {
           return(
               <input id={this.props.id}
                      placeholder={this.props.placeholder}
                      className={"text_line_input "+this.props.css_classes}
                      value={this.state.value}
                      onChange={this.handleChange}
                      autoComplete={this.auto_complete}>
               </input>
           )
       }

    }
}
