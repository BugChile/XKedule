import React from "react"
import WheelSelector from "./wheelSelector";
import { stringRange } from "../../js_helpers/helpers"

// Input to set time, specifically hour and minute
//
// Props:
//     Required:

//     Optional:
//
//     props.className: (optional) additinal css classes, main is "hour_minute_input"

export default class HourMinuteInput extends React.PureComponent {
    constructor(props){
        super(props)
        if (props.value) {
            this.state = {
                hour: this.props.value.getHours().toString().padStart(2, "0"),
                minute: this.props.value.getMinutes().toString().padStart(2, "0"),
                hour_options: stringRange(0, 24, 2),
                minute_options: stringRange(0, 60, 2),
            }
        } else {
            this.state = {
                hour: "00",
                minute: "00",
                hour_options: stringRange(0, 24, 2),
                minute_options: stringRange(0, 60, 2),
            }
        }


        this.setHours = this.setHours.bind(this);
        this.setMinutes = this.setMinutes.bind(this);
        this.submitValue = this.submitValue.bind(this);
    };

    setHours(hour){
        this.setState({hour})
    }

    setMinutes(minute){
        this.setState({minute})
    }

    submitValue(){
        this.props.onSubmit({hour: parseInt(this.state.hour),
                             minute: parseInt(this.state.minute)});
    }

   render() {
        return(
            <div className={"hour_minute_input "+this.props.className}>
                <div className="time_slider" >
                    <WheelSelector options={this.state.hour_options}
                                   value={this.state.hour}
                                   onChange={this.setHours}/>
                    <div className="" style={{marginTop: "50px"}}>
                        :
                    </div>
                    <WheelSelector options={this.state.minute_options}
                                   value={this.state.minute}
                                   onChange={this.setMinutes}/>
                </div>
                <div className="button" onClick={this.submitValue}>
                    Accept
                </div>
            </div>
        )
    }
}
