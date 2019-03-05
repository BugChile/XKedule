import React from "react";
import PropTypes from 'prop-types';


// Simple input for text, can load and save information. Receives:
//     - props.id:          (optional) must be unique
//     - props.value:         (optional) value holder
//     - props.onChange: (optional) callback to save value changes whith
//                             same format as value. Needed if props.value is passed
//     - props.className:   (optional) additional css classes. Main class is
//                            .text_line_input
//     - props.expanded:    (optional) if true, the input will begin showing options
//

export default class SelectInput extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            expanded: false,
            value: 0,
        }
        if (typeof props.value !== "string") {
            this.mode = "independent" // component saves the value
        } else {
            this.mode = "messenger"; // component doesn't save the value
            this.state.value = props.value;

        }

        this.id = props.id;

        this.handleClick = this.handleClick.bind(this);
        this.setValue = this.setValue.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.getComponents = this.getComponents.bind(this);
    };

    setValue(value){
        this.setState({value});
        if (this.props.onSubmit) {
            this.props.onSubmit(this.props.options[value]);
        }
    }

    handleClick(value){
        this.setValue(value);
        if (this.props.blur_on_change) {
            this.onBlur();
        }
    };

    onFocus(){
        this.setState({expanded: true});
    }

    onBlur(){
        this.setState({expanded: false});
    }

    getComponents(options, expanded, value){
        if (expanded) {
            var options_divs = [];
            options.forEach((option) => {
                options_divs.push(<div   className="select_option"
                                    onClick={() => {this.handleClick(options.indexOf(option))}}
                                    id={`select_option_${options.indexOf(option)}_${this.props.id}`}
                                    key={`select_option_${options.indexOf(option)}_${this.props.id}`}>
                                    {option}
                                </div>)
            });
            return (
                <div className="select_options_container" >
                  {[options_divs]}
                </div>
            )
        } else {

            return (
                    <div className="value_container"
                             onClick={this.onFocus}
                             tabIndex="-1">
                                {options[this.state.value]}
                         </div>
                    )
        }
    }

    componentDidMount(){
        if (this.props.expanded) {
            this.setState({expanded: this.props.expanded});
            document.getElementById(this.id).focus();
        }
    }


   render() {
       return(
               <div id={this.props.id}
                      className={"select_input "+this.props.className}
                      tabIndex="-1"
                      onFocus={this.onFocus}
                      onBlur={this.onBlur}>
                        {this.getComponents(this.props.options, this.state.expanded, this.state.value)}
               </div>
           )
       }
}
