import React from "react"
import SelectInput from "../input_components/selectInput";
import OnOffInputContainer from "../input_components/onOffInputContainer";
import MultipleStageInput from "../input_components/multipleStageInput";
import SimpleInputOffState from "../input_components/simpleInputOffState";
import CustomRepeatTool from "./customRepeatTool.js"
import CustomOcurrencesTool from "./customOcurrencesTool.js"
import Calendar from 'react-calendar/dist/entry.nostyle';
import { RRule } from "rrule";


export default class RepeatTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          rrule: "",

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
                      on_component_value={""}
                      on_component_save={""}
                      on_component={MultipleStageInput}
                      off_component={SimpleInputOffState}
                      container_style='event_form_big_input event_form_on_off'
                      on_component_props= {{component_list: [{
                                                                  input_component: SelectInput,
                                                                  input_props: {options: ["everyday",
                                                                                          "every weekday",
                                                                                          "weekly on mondays",
                                                                                          "monthly on day 25",
                                                                                          "yearly on november 25",
                                                                                          "custom..."], expanded: true
                                                                  },
                                                                  route_values: {
                                                                      "everyday": "submit",
                                                                      "every weekday": "submit",
                                                                      "weekly on mondays": "submit",
                                                                      "monthly on day 25": "submit",
                                                                      "yearly on november 25": "submit"
                                                                      // custom continues to next input
                                                                  }
                                                              },
                                                            {
                                                                input_component: CustomRepeatTool,
                                                            }],
                                            onSubmit: (value) => {console.log(value)} }
                                            }

                     off_text="Repeats"
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
                                                                  input_props: {options: ["never",
                                                                                          "until specific date",
                                                                                          "after number of ocurrences"
                                                                                          ], expanded: true
                                                                  },
                                                                  route_values: {
                                                                      "never": "submit",
                                                                      "until specific date": {"go_to": 1},
                                                                      "after number of ocurrences": {"go_to": 2}
                                                                      // custom continues to next input
                                                                  }
                                                              },
                                                              {
                                                                  input_component: Calendar,
                                                                  input_props: {className: "input_calendar"},
                                                              },
                                                              {
                                                                  input_component: CustomOcurrencesTool,
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
