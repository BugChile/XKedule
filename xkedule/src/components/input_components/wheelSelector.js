import React from "react"

// Wheel selector

export default class WheelSelector extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            position: 0,
        }
        if (!props.value) {
            this.mode = "independent" // component saves the value
            this.state.value = ""
        } else {
            this.mode = "messenger" // component sends the value up
        }


        this.handleChange = this.handleChange.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.getOptionDivs = this.getOptionDivs.bind(this);
        this.moveBack = this.moveBack.bind(this);
        this.moveForward = this.moveForward.bind(this);
    };

    setValue(value){
        this.setState({value})
    };

    setPosition(position){
        this.setState({position})
    };

    handleChange(event){
        if (this.mode === "messenger") {
            this.props.onChange(event.target.value);
        } else {
            this.setValue(event.target.value)
        }
    }

    moveBack(){
        if (this.state.position === 0) {
            this.setPosition(this.props.options.length - 1);
        } else {
            this.setPosition(this.state.position - 1);
        }
    }

    moveForward(){
        if (this.state.position + 1 === this.props.options.length) {
            this.setPosition(0);
        } else {
            this.setPosition(this.state.position + 1);
        }
    }

    getOptionDivs(options, position){
        var option_divs = []
        var index = (position - 1);
        if (index < 0) {
            index = options.length + index;
        }
        for (var i = 0; i < 3; i++) {
            if (options[index]) {
                option_divs.push(<div className="" key={"wheel_selection_"+i}>
                                     {options[index]}
                                 </div>)
            } else {
                option_divs.push(<div className="" key={"wheel_selection_"+i}>
                                 </div>)
            }
            index = (index + 1) % options.length;
        }
        return option_divs;
    }

    render() {
       if (this.mode === "messenger") {
           return(
               <div className={"wheel_selector_container "+this.props.className} >
                   <div className="control_container"
                        onClick={this.moveBack}>
                        <svg className="control_arrow" viewBox="0 0 114 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M55.5858 1.41421L1.26209 55.7379C0.217151 56.7828 0.627281 58.5611 2.02432 59.0429L2.65128 59.2591C3.37447 59.5084 4.17655 59.3234 4.71747 58.7825L55.5858 7.91421C56.3668 7.13316 57.6332 7.13317 58.4142 7.91421L109.283 58.7825C109.823 59.3234 110.626 59.5084 111.349 59.2591L111.976 59.0429C113.373 58.5611 113.783 56.7828 112.738 55.7379L58.4142 1.41421C57.6332 0.633165 56.3668 0.633166 55.5858 1.41421Z" fill="black" stroke="black"/>
                        </svg>
                   </div>
                   {this.getOptionDivs(this.props.options, this.state.position)}
                   <div className="control_container"
                        onClick={this.moveForward}>
                        <svg className="control_arrow reversed" viewBox="0 0 114 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M55.5858 1.41421L1.26209 55.7379C0.217151 56.7828 0.627281 58.5611 2.02432 59.0429L2.65128 59.2591C3.37447 59.5084 4.17655 59.3234 4.71747 58.7825L55.5858 7.91421C56.3668 7.13316 57.6332 7.13317 58.4142 7.91421L109.283 58.7825C109.823 59.3234 110.626 59.5084 111.349 59.2591L111.976 59.0429C113.373 58.5611 113.783 56.7828 112.738 55.7379L58.4142 1.41421C57.6332 0.633165 56.3668 0.633166 55.5858 1.41421Z" fill="black" stroke="black"/>
                        </svg>
                   </div>
               </div>
           )
       } else {
           return(
               <div className={"wheel_selector_container "+this.props.className} >
                   <div className="control_container"
                        onClick={this.moveBack}>
                        <svg className="control_arrow" viewBox="0 0 114 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M55.5858 1.41421L1.26209 55.7379C0.217151 56.7828 0.627281 58.5611 2.02432 59.0429L2.65128 59.2591C3.37447 59.5084 4.17655 59.3234 4.71747 58.7825L55.5858 7.91421C56.3668 7.13316 57.6332 7.13317 58.4142 7.91421L109.283 58.7825C109.823 59.3234 110.626 59.5084 111.349 59.2591L111.976 59.0429C113.373 58.5611 113.783 56.7828 112.738 55.7379L58.4142 1.41421C57.6332 0.633165 56.3668 0.633166 55.5858 1.41421Z" fill="black" stroke="black"/>
                        </svg>
                   </div>
                   {this.getOptionDivs(this.props.options, this.state.position)}
                   <div className="control_container"
                        onClick={this.moveForward}>
                        <svg className="control_arrow reversed" viewBox="0 0 114 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M55.5858 1.41421L1.26209 55.7379C0.217151 56.7828 0.627281 58.5611 2.02432 59.0429L2.65128 59.2591C3.37447 59.5084 4.17655 59.3234 4.71747 58.7825L55.5858 7.91421C56.3668 7.13316 57.6332 7.13317 58.4142 7.91421L109.283 58.7825C109.823 59.3234 110.626 59.5084 111.349 59.2591L111.976 59.0429C113.373 58.5611 113.783 56.7828 112.738 55.7379L58.4142 1.41421C57.6332 0.633165 56.3668 0.633166 55.5858 1.41421Z" fill="black" stroke="black"/>
                        </svg>
                   </div>
               </div>
           )
       }

    }
}
