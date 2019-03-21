import React from "react"
import SelectInput from "../input_components/selectInput";
import OnOffInputContainer from "../input_components/onOffInputContainer";
import MultipleStageInput from "../input_components/multipleStageInput";
import SimpleInputOffState from "../input_components/simpleInputOffState";
import CustomRepeatTool from "./customRepeatTool.js"
import CustomOccurrencesTool from "./customOccurrencesTool.js"
import Calendar from 'react-calendar/dist/entry.nostyle';
import { RRule } from "rrule";
import { dateToWritenDate } from "../../js_helpers/parsers.js"
import { rrule_day_dict,
         everyday_rrule,
         everyweekday_rrule,
         weekly_on_weekday,
         monthly_on_monthday,
         yearly_on_month_day,
         get_day_occurrence,
         getRepeatsSummary } from "../../js_helpers/rrule_helpers.js"

export default class RepeatTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          rrule: "never",
          ending_mode: "never", //never, occurrences or date
          ending_date: props.event_date, //only used on date ending mode
          ending_occurrences: 1, //only used on occurrences ending mode

      }

      this.option_list = [
          everyday_rrule,
          everyweekday_rrule,
          weekly_on_weekday(props.event_date.getDay()),
          monthly_on_monthday(props.event_date.getDate()),
          yearly_on_month_day(props.event_date.getMonth() + 1, props.event_date.getDate())
      ]

      this.option_to_rrule_map = {}
      this.option_to_rrule_map["never"] = "never";

      this.option_list.forEach((option) => {
          this.option_to_rrule_map[option.toText()] = option
      });

      this.setRRule = this.setRRule.bind(this);
      this.generateCustomRRule = this.generateCustomRRule.bind(this);
      this.receiveEndingResult = this.receiveEndingResult.bind(this);
      this.getEndingText = this.getEndingText.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

    }

    onSubmit(){
        if (this.props.onSubmit) {
            var final_rrule = this.state.rrule;
            if (this.state.ending_mode === "date") {
                final_rrule.options.until = this.state.ending_date;
            } else if (this.state.ending_mode === "occurrences") {
                final_rrule.options.count = this.state.ending_occurrences;
            }
            final_rrule.options.dtstart = this.props.event_date;
            this.props.onSubmit(final_rrule);
        }
    }

    receiveEndingResult(result){
        const ending_mode = result[0];
        if (ending_mode === "until specific date") {
            this.setState({ending_mode: "date", ending_date: result[1]});
        } else if (ending_mode === "after number of occurrences") {
            this.setState({ending_mode: "occurrences", ending_occurrences: result[1]});
        } else {
            this.setState({ending_mode: "never"});
        }
    }

    setRRule(multipleStageOutput){
        if (multipleStageOutput[0] === "custom...") {
            this.setState({rrule: this.generateCustomRRule(multipleStageOutput[1])})
        } else if (multipleStageOutput[0] === "never"){
            this.setState({rrule: "never"})
        } else {
            const rrule = multipleStageOutput[0];
            this.setState({rrule});
        }
    }

    generateCustomRRule(custom_tool_value){
        var new_rrule;
        if (custom_tool_value.freq === 1) { //monthly
            if (custom_tool_value.month_mode === "on_day_number") {
                new_rrule = new RRule({
                                    freq: RRule.MONTHLY,
                                    interval: custom_tool_value.interval,
                                    bymonthday: this.props.event_date.getDate(),
                            })
            } else {
                new_rrule = new RRule({
                                    freq: RRule.MONTHLY,
                                    interval: custom_tool_value.interval,
                                    byweekday: [rrule_day_dict[
                                                    this.props.event_date.getDay()].nth(
                                                            1+get_day_occurrence(this.props.event_date))],
                            })
            }
        } else if (custom_tool_value.freq === 2) { // weekly
            new_rrule = new RRule({
                freq: RRule.WEEKLY,
                interval: custom_tool_value.interval,
                byweekday: custom_tool_value.week_mode_selected.map(x => rrule_day_dict[x]),
            })
        } else { //yearly or daily
            new_rrule = new RRule({
                                freq: custom_tool_value.freq,
                                interval: custom_tool_value.interval
                        })
        }
        return new_rrule;
    }

    getEndingText(ending_mode){
        if (ending_mode === "date") {
            return dateToWritenDate(this.state.ending_date);
        } else if (ending_mode === "occurrences") {
            return ` after ${this.state.ending_occurrences} ${this.state.ending_occurrences > 1 ? "occurrences" : "occurrence"}`;
        } else {
            return "never";
        }
    }

  render() {
      return(
              <div className={this.props.className}>
                  <div className="horizontal_flex label_input_combo" id="custom_row_2">
                  <div className="input_label">
                    Repeats
                  </div>
                  <OnOffInputContainer
                      on_component_value={this.state.rrule}
                      on_component_save={this.setRRule}
                      value_to_summary={getRepeatsSummary}
                      on_component={MultipleStageInput}
                      off_component={SimpleInputOffState}
                      container_style='event_form_big_input event_form_on_off'
                      on_component_props= {{component_list: [{
                                                                  input_component: SelectInput,
                                                                  input_props: {options: { ...this.option_to_rrule_map, "custom...": "custom..."},
                                                                                expanded: true
                                                                  },
                                                                  route_values: {
                                                                      "submit": Object.values(this.option_to_rrule_map)
                                                                      // custom continues to next input
                                                                  }
                                                              },
                                                            {
                                                                input_component: CustomRepeatTool,
                                                                input_props: {event_date: this.props.event_date}
                                                            }]
                                                         }
                                            }
                     />
                  </div>

                  <div className="horizontal_flex label_input_combo" id="custom_row_2">
                  <div className="input_label">
                    Ending
                  </div>
                  <OnOffInputContainer
                      on_component={MultipleStageInput}
                      off_component={SimpleInputOffState}
                      on_component_save={this.receiveEndingResult}
                      container_style='event_form_big_input event_form_on_off'
                      on_component_props= {{component_list: [{
                                                                  input_component: SelectInput,
                                                                  input_props: {options: {"never": "never",
                                                                                          "until specific date": "until specific date",
                                                                                          "after number of occurrences": "after number of occurrences"
                                                                                      }, expanded: true
                                                                  },
                                                                  route_values: {
                                                                      "submit": "never",
                                                                      "go_to": {"until specific date": 1, //go to calendar
                                                                                "after number of occurrences": 2} //go to occurrences tool
                                                                  }
                                                              },
                                                              {
                                                                  input_component: Calendar,
                                                                  input_props: {className: "input_calendar",
                                                                                minDate: this.props.event_date,
                                                                                value: this.state.ending_date},
                                                                  route_values: {
                                                                      "submit": "all"
                                                                  }
                                                              },
                                                              {
                                                                  input_component: CustomOccurrencesTool,
                                                                  input_props: {value: this.state.ending_occurrences}
                                                              }
                                                          ]}
                                        }

                     off_text={this.getEndingText(this.state.ending_mode)}
                     />
                  </div>
                  <div className="button" onClick={this.onSubmit}>
                      Accept
                  </div>
              </div>
    )
  }
  }
