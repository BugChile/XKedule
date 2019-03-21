import React from "react"
import NumberSelector from "../input_components/numberSelector";

// tool for creating custom repeat cycles

export default class CustomOccurrencesTool extends React.PureComponent {
    constructor(props){
        super(props)
        if (props.value) {
            this.state = {
                number: props.value,
            }
        } else {
            this.state = {
                number: 1,
            }
        }

        this.setNumber = this.setNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };

    setNumber(number){
        this.setState({number});
    }

    onSubmit(){
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.number);
        }
    }

   render() {
        return(
            <div className={"custom_repeat_tool "+this.props.className}>
                <div className="horizontal_flex" id="custom_row_1">
                    <span>
                        after
                    </span>
                    <div className="" >
                    <NumberSelector min_value={1} value={this.state.number} onChange={this.setNumber}/>
                    </div>
                    <span>
                        {this.state.number > 1 ? "occurrences" : "occurrence"}
                    </span>
                </div>
                <div className="horizontal_flex shrink_row">
                    <div className="button" onClick={this.onSubmit}>
                        Accept
                    </div>
                    <a className="clickable_anchor" onClick={this.props.doneEditing}>
                        Cancel
                    </a>
                </div>

            </div>
        )
    }
}
