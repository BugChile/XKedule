import React from "react"
import SelectInput from "../input_components/selectInput";
import NumberSelector from "../input_components/numberSelector";
import CircleOptionsInput from "../input_components/circleOptionsInput";
import { RRule } from "rrule";
import { rrule_day_dict, day_ordinal } from "../../js_helpers/rrule_helpers.js"
// tool for creating custom repeat cycles



export default class CustomRepeatTool extends React.PureComponent {
    constructor(props){
        super(props)
        this.rrule_freq_dict = {"day": RRule.DAILY,
                                "week": RRule.WEEKLY,
                                "month": RRule.MONTHLY,
                                "year": RRule.YEARLY}


        this.state = {
            rrule_interval: 1,
            mode: "day",
            select_options: {"day": "day", "week": "week", "month": "month", "year": "year"},
            plural_options: false,
            rrule_freq: RRule.DAILY,
            month_mode: "on_day_number", //only used if frequency is monthly
            week_mode_selected: [this.getSelectedWeekMode()], // only used if frequency is weekly
        }

        this.setInterval = this.setInterval.bind(this);
        this.setMode = this.setMode.bind(this);
        this.getAdditionalInfo = this.getAdditionalInfo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.pluralizeOptions = this.pluralizeOptions.bind(this);
        this.getSelectedWeekMode = this.getSelectedWeekMode.bind(this);
        this.setMonthMode = this.setMonthMode.bind(this);
        this.setWeekModeSelected = this.setWeekModeSelected.bind(this);
    };

    setInterval(rrule_interval){
        if (rrule_interval === 1) {
            this.setState({rrule_interval, pluralize: false})
        } else {
            this.setState({rrule_interval, pluralize: true})
        }
    }

    setMode(mode){
        if (mode === "month") {
            // appart from setting mode and rrule_freq, restart option to on_day_number
            this.setState({mode, rrule_freq: this.rrule_freq_dict[mode], month_mode: "on_day_number"});
        } else if (mode === "week") {
            // appart from setting mode and rrule_freq, restart week days selection
            this.setState({mode, rrule_freq: this.rrule_freq_dict[mode], week_mode_selected: [this.getSelectedWeekMode()]});
        } else {
            this.setState({mode, rrule_freq: this.rrule_freq_dict[mode]});
        }
    }

    setMonthMode(month_mode){
        this.setState({month_mode});
    }

    setWeekModeSelected(week_mode_selected){
        this.setState({week_mode_selected});
    }

    onSubmit(){
        const circle_option_map = {"Mo":1, "Tu":2, "We":3, "Th":4, "Fr":5, "Sa":6, "Su":0};
        //map to js date numbers for days, sunday = 0, saturday = 6
        const circle_selected_mapped = this.state.week_mode_selected.map(x => circle_option_map[x]);


        const submit_value = {
            freq: this.state.rrule_freq,
            interval: this.state.rrule_interval,
            month_mode: this.state.month_mode,
            week_mode_selected: circle_selected_mapped
        }
        this.props.onSubmit(submit_value);
    }

    pluralizeOptions(option){
        return option+"s"
    }

    getSelectedWeekMode(){
        // shift sunday = 0, saturday = 6 to monday = 0, sunday = 6 for local calendar mode
        const day_list = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
        const day = this.props.event_date.getDay(); //
        if (day === 0) {
            return "Su";
        }
        return day_list[day - 1];
    }

    getAdditionalInfo(mode){
        switch (mode) {
            case "week":
                return <CircleOptionsInput options={["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]}
                                           preselected={this.state.week_mode_selected}
                                           onSubmit={this.setWeekModeSelected}/>
            case "month":
                const on_day_number_option = `on day ${this.props.event_date.getDate()}`;
                const week_and_day = day_ordinal(this.props.event_date);
                const on_day_position_option = `on the ${week_and_day}`
                var options = {};
                options[on_day_number_option] = "on_day_number";
                options[on_day_position_option] = "on_day_position";
                return <SelectInput options={options}
                                    onSubmit={this.setMonthMode}/>
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
                    <NumberSelector min_value={1} value={1} onChange={this.setInterval}/>
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
