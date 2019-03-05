import React from "react"
import SelectInput from "../input_components/selectInput";
import OnOffInputContainer from "../input_components/onOffInputContainer";
import MultipleStageInput from "../input_components/multipleStageInput";
import SimpleInputOffState from "../input_components/simpleInputOffState";
import CustomRepeatTool from "./customRepeatTool.js"


export default class RepeatTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          repeat: "",
          ending: "",

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

                     off_text="Never"
                     />
                  </div>

                  <div className="horizontal_flex label_input_combo" id="custom_row_2">
                  <div className="input_label">
                    Ending
                  </div>
                  <SelectInput   value={this.state.new_link_name}
                                 options={["Hola", "Chao", "Wena"]}
                                 id="select_input_repeat_input_ending"
                                 onChange={this.setNewLinkName}/>
                  </div>
                  <div className="button" onClick={this.saveLink}>
                      Accept
                  </div>
              </div>
    )
  }
  }
