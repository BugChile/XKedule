import React from "react"
import SelectInput from "../input_components/selectInput";
import NumberSelector from "../input_components/numberSelector";
import CircleOptionsInput from "../input_components/circleOptionsInput";
import { RRule } from "rrule";
import { everyday_rrule,
         weekly_on_weekday,
         monthly_on_monthday,
         yearly_on_month_day } from "../../js_helpers/rrule_helpers.js"
// tool for creating custom repeat cycles



export default class CustomRepeatTool extends React.PureComponent {
    constructor(props){
        super(props)
        this.base_daily_rrule = everyday_rrule;
        this.base_weekly_rrule = weekly_on_weekday(props.event_date.getDay());
        this.base_monthly_rrule = monthly_on_monthday(props.event_date.getDate());
        this.base_yearly_rrule = yearly_on_month_day(props.event_date.getMonth(), props.event_date.getDate());

        this.state = {
            number: 1,
            mode: "day",
            select_options: {"day": "day", "week": "week", "month": "month", "year": "year"},
            plural_options: false,
            rrule: this.base_daily_rrule,
        }

        this.setNumber = this.setNumber.bind(this);
        this.setMode = this.setMode.bind(this);
        this.getAdditionalInfo = this.getAdditionalInfo.bind(this);
        this.submitValue = this.submitValue.bind(this);
        this.pluralizeOptions = this.pluralizeOptions.bind(this);
    };

    setNumber(number){
        var new_rrule = Object.assign({}, this.state.rrule);
        new_rrule.options.interval = number;
        if (number === 1) {
            this.setState({number, pluralize: false, rrule: new_rrule})
        } else {
            this.setState({number, pluralize: true, rrule: new_rrule})
        }
    }

    setMode(mode){
        this.setState({mode});
    }

    submitValue(){

    }

    pluralizeOptions(option){
        return option+"s"
    }

    getAdditionalInfo(mode){
        switch (mode) {
            case "week":
                return <CircleOptionsInput options={["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]}/>
            case "month":
                return <SelectInput options={["on day 25", "on the third Wednesday"]}/>
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
                    <SelectInput options={this.state.select_options}
                                 onSubmit={this.setMode}
                                 perform_text_transform={this.state.pluralize}
                                 text_transform={this.pluralizeOptions}
                                 />
                </div>
                <div className="horizontal_flex additional_info" >
                    {this.getAdditionalInfo(this.state.mode)}
                </div>
                <div className="horizontal_flex shrink_row">
                    <div className="button" onClick={this.submitValue}>
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
