import React from "react"
import WheelSelector from "./wheelSelector";

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
        this.state = {
            hour_options: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
                           "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
            minute_options: ["00", "10", "20", "30", "40", "50"],
        }
    };

   render() {
        return(
            <div className={"hour_minute_input "+this.props.className}>
                <div className="time_slider" >
                    <WheelSelector options={this.state.hour_options}/>
                    <div className="" style={{marginTop: "40px"}}>
                        :
                    </div>
                    <WheelSelector options={this.state.minute_options}/>
                </div>
                <div className="button" >
                    Accept
                </div>
            </div>
        )
    }
}
