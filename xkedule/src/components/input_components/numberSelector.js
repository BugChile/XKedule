import React from "react"

// Number selector (only min value supported right now)

export default class NumberSelector extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            value: 0,
            keyboard_mode: false, // user enters value with keyboard. Activated
                                  // when center wheel value is clicked
            keyboard_mode_value: "",
            bootphon_keyboard: false,
        }

        if (!props.value) {
            this.mode = "independent"
        } else {
            this.mode = "messenger" // send the value up when it changes
            this.state.value = props.value;
        }

        this.min_value = props.min_value ? props.min_value : 0;

        this.setValue = this.setValue.bind(this);
        this.setKeyboardModeValue = this.setKeyboardModeValue.bind(this);
        this.getValueDiv = this.getValueDiv.bind(this);
        this.parseValue = this.parseValue.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.keyboardModeOn = this.keyboardModeOn.bind(this);
        this.keyboardModeOff = this.keyboardModeOff.bind(this);
        this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
        this.handleKeyDownInput = this.handleKeyDownInput.bind(this);
    };

    setValue(value){
        this.setState({value})
        if (this.mode === "messenger") {
            this.props.onChange(value);
        }
    };

    setKeyboardModeValue(keyboard_mode_value){
        this.setState({keyboard_mode_value})
    };

    moveUp(){
        this.setValue(this.state.value + 1);
    }

    moveDown(){
        if (this.state.value > this.min_value) {
            this.setValue(this.state.value - 1);
        }
    }

    getValueDiv(keyboard_mode, value, keyboard_mode_value){

        const props = {className: "wheel_selector_actual_value",
                 onKeyPress: this.handleKeyboardInput,
                 onKeyDown: this.handleKeyDownInput, //non printables like delete
                 tabIndex: "-1",
                 onFocus: this.keyboardModeOn,
                 onBlur: this.keyboardModeOff,
                 key: `wheel_selection_actual_value`,
                 title: value}
        var value_div;
        if (keyboard_mode) {
            value_div = (<div {...props} id={`wheel_selection_editing_value`}>
                                {keyboard_mode_value}
                             </div>);
        } else {
            value_div = (<div {...props}>
                                 {this.parseValue(value)}
                             </div>);
        }
        return value_div;
    }

    parseValue(value){
        var value_string = value.toString();
        if (value_string.length > 4) {
            value_string = value_string.slice(0, 4) + "...";
        }
        return value_string;
    }

    keyboardModeOn(){
        this.setState({bootphon_keyboard: true}); //only for view purposes
        this.setKeyboardModeValue("");
        this.setState({keyboard_mode: true});
    }

    keyboardModeOff(){
        const keyboard_mode_value_int = parseInt(this.state.keyboard_mode_value)
        if (keyboard_mode_value_int >= this.min_value) {
            this.setValue(keyboard_mode_value_int);
        }
        this.setState({keyboard_mode: false});
        this.setKeyboardModeValue("");
    }

    handleKeyboardInput(event){
        // filter viable new values in keyboard mode given the actual keyboard
        // mode value and the new char, filtering from options
        var possible_new_value = this.state.keyboard_mode_value+event.key;

        if (parseInt(possible_new_value) >= this.min_value && possible_new_value.length < 8) {
            this.setKeyboardModeValue(possible_new_value);
        }
    }

    handleKeyDownInput(event){
        if (event.keyCode === 8) { // delete key
            var possible_new_value = this.state.keyboard_mode_value.slice(0, -1);
            if (parseInt(possible_new_value) >= this.min_value) {
                this.setKeyboardModeValue(possible_new_value);
            }
        } if (event.keyCode === 13) { // enter key
            document.getElementById("wheel_selection_editing_value").blur();
        }
    }

    render() {
       return(
               <div className={"wheel_selector_container "+this.props.className} >
                   <div className="wheel_selector_next_control"
                        onClick={this.moveUp}>
                        <svg className="control_arrow" viewBox="0 0 114 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M55.5858 1.41421L1.26209 55.7379C0.217151 56.7828 0.627281 58.5611 2.02432 59.0429L2.65128 59.2591C3.37447 59.5084 4.17655 59.3234 4.71747 58.7825L55.5858 7.91421C56.3668 7.13316 57.6332 7.13317 58.4142 7.91421L109.283 58.7825C109.823 59.3234 110.626 59.5084 111.349 59.2591L111.976 59.0429C113.373 58.5611 113.783 56.7828 112.738 55.7379L58.4142 1.41421C57.6332 0.633165 56.3668 0.633166 55.5858 1.41421Z" fill="black" stroke="black"/>
                        </svg>
                   </div>
                   {this.getValueDiv(this.state.keyboard_mode,
                                     this.state.value,
                                     this.state.keyboard_mode_value)}
                   <div className="wheel_selector_next_control"
                        onClick={this.moveDown}>
                        <svg className="control_arrow reversed" viewBox="0 0 114 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M55.5858 1.41421L1.26209 55.7379C0.217151 56.7828 0.627281 58.5611 2.02432 59.0429L2.65128 59.2591C3.37447 59.5084 4.17655 59.3234 4.71747 58.7825L55.5858 7.91421C56.3668 7.13316 57.6332 7.13317 58.4142 7.91421L109.283 58.7825C109.823 59.3234 110.626 59.5084 111.349 59.2591L111.976 59.0429C113.373 58.5611 113.783 56.7828 112.738 55.7379L58.4142 1.41421C57.6332 0.633165 56.3668 0.633166 55.5858 1.41421Z" fill="black" stroke="black"/>
                        </svg>
                   </div>
               </div>
           )
    }
}
