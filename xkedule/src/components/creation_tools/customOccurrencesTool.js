import React from "react"
import NumberSelector from "../input_components/numberSelector";

// tool for creating custom repeat cycles

export default class CustomOccurrencesTool extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            number: 1,
        }

        this.setNumber = this.setNumber.bind(this);
    };

    setNumber(number){
        this.setState({number});
    }

   render() {
        return(
            <div className={"custom_repeat_tool "+this.props.className}>
                <div className="horizontal_flex" id="custom_row_1">
                    <span>
                        after
                    </span>
                    <div className="" >
                    <NumberSelector min_value={1} value={1} onChange={this.setNumber}/>
                    </div>
                    <span>
                        occurrences
                    </span>
                </div>
                <div className="horizontal_flex shrink_row">
                    <div className="button" onClick={this.submitValue}>
                        Accept
                    </div>
                    <a className="clickable_anchor" onClick={this.doneEditing}>
                        Cancel
                    </a>
                </div>

            </div>
        )
    }
}
