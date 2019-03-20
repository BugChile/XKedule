import React from "react"
import SelectInput from "../input_components/selectInput";
import OnOffInputContainer from "../input_components/onOffInputContainer";
import MultipleStageInput from "../input_components/multipleStageInput";
import SimpleInputOffState from "../input_components/simpleInputOffState";
import CustomRepeatTool from "./customRepeatTool.js"
import CustomOccurrencesTool from "./customOccurrencesTool.js"
import Calendar from 'react-calendar/dist/entry.nostyle';
import { RRule } from "rrule";
import { rrule_day_dict,
         everyday_rrule,
         everyweekday_rrule,
         weekly_on_weekday,
         monthly_on_monthday,
         yearly_on_month_day,
         get_day_occurrence } from "../../js_helpers/rrule_helpers.js"

export default class RepeatTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          rrule: "never",

      }

      this.option_list = [
          everyday_rrule,
          everyweekday_rrule,
          weekly_on_weekday(props.event_date.getDay()),
          monthly_on_monthday(props.event_date.getDate()),
          yearly_on_month_day(props.event_date.getMonth(), props.event_date.getDate())
      ]

      this.option_to_rrule_map = {}
      this.option_to_rrule_map["never"] = "never";

      this.option_list.forEach((option) => {
          this.option_to_rrule_map[option.toText()] = option
      });

      this.setRRule = this.setRRule.bind(this);
      this.getRepeatsSummary = this.getRepeatsSummary.bind(this);
      this.generateCustomRRule = this.generateCustomRRule.bind(this);

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
                                    byweekday: [RRule.TH.nth(1+get_day_occurrence(this.props.event_date))],
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

    getRepeatsSummary(value){
        if (typeof(value) === "string") {
            return value;
        } else {
            return value.toText();
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
                      value_to_summary={this.getRepeatsSummary}
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
                      on_component_value={""}
                      on_component_save={""}
                      on_component={MultipleStageInput}
                      off_component={SimpleInputOffState}
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
                                                                  input_props: {className: "input_calendar"},
                                                              },
                                                              {
                                                                  input_component: CustomOccurrencesTool,
                                                              }
                                                          ],

                                            onSubmit: (value) => {console.log(value)} }
                                        }

                     off_text="Ending"
                     />
                  </div>
                  <div className="button" onClick={this.saveLink}>
                      Accept
                  </div>
              </div>
    )
  }
  }
