import React from "react"
import SelectInput from "../input_components/selectInput";
import NumberSelector from "../input_components/numberSelector";
import CircleOptionsInput from "../input_components/circleOptionsInput";

// tool for creating custom repeat cycles

export default class CustomRepeatTool extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            number: 1,
            mode: "day",
        }

        this.setNumber = this.setNumber.bind(this);
        this.setMode = this.setMode.bind(this);
        this.getSelectOptions = this.getSelectOptions.bind(this);
        this.getAdditionalInfo = this.getAdditionalInfo.bind(this);
    };

    setNumber(number){
        this.setState({number});
    }

    setMode(mode){
        if (mode[mode.length - 1] === "s") {
            this.setState({mode: mode.slice(0, -1)});
        } else {
            this.setState({mode});
        }
    }

    getSelectOptions(number){
        if (number > 1) {
            return ["days", "weeks", "months", "years"]
        } else {
            return ["day", "week", "month", "year"]
        }
    }

    getAdditionalInfo(mode){
        switch (mode) {
            case "week":
                return <CircleOptionsInput options={["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]}/>
            case "month":
                return <SelectInput options={["on day 25", "on the third Wednesday"]} blur_on_change/>
        }
    }

   render() {
        return(
            <div className={"custom_repeat_tool "+this.props.className}>
                <div className="horizontal_flex" id="custom_row_1">
                    <span>
                        every
                    </span>
                    <div className="" >
                    <NumberSelector min_value={1} value={1} onChange={this.setNumber}/>
                    </div>
                    <SelectInput options={this.getSelectOptions(this.state.number)}
                                 onSubmit={this.setMode}
                                 blur_on_change/>
                </div>
                <div className="horizontal_flex additional_info" >
                    {this.getAdditionalInfo(this.state.mode)}
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
