import React from "react"
import PropTypes from 'prop-types';

// This component IS NOT an input, but a wrapper of inputs. It's used to
// put one input after another, saving their values.
//
//
// Required:
//     - props.component_list: (required) structure defining object, component inputs
//                                        must submit their value with a call to
//                                        props.onSubmit, list format:
//
//              [
//                  ...,
//                  {   input_component: ReactComponent,
//                      input_props: (optional), additional props for component
//                      route_values: (optional, object)
//                      submit_on_change: (true/false)
//                  },
//                  ...
//              ]
//
//      route_values should be a dict, mapping possible values (keys) of that input to
//      one of the following:
//
//                  - {"submit": list of values} if one of the values on the list is selected,
//                                               will submit the already saved
//                                               stages, ending the questionnaire
//                                               even if there's more stages ahead.
//                                               if instead of list of values,
//                                               submit = "all", all responses
//                                               will submit.
//                  - {"go_to": mapping of {values: stage}}
//                                               if one of the values on the is selected,
//                                               will go to that stage number
//
//     - props.onSubmit:  (required) callback to update final value
//
//
//
// Optional:
//
//
//     - props.container_style: (optional) additional css class of the div that
//                              contains both off and on states. Main class is
//                              .multiple_stage_input_container
//


export default class MultipleStageInput extends React.PureComponent {

    _timeoutID;

    constructor(props){
        super(props)
        this.state = {
            stage: 0,
            saved_values: [],
            isManagingFocus: false,
        };

        this.on_component_id = "MultipleStageFocusedChild"

        this.updatedSavedValues = [];


        this.getComponent = this.getComponent.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.nextStage = this.nextStage.bind(this);
    };

    getComponent(stage){
        const Component = this.props.component_list[stage].input_component;
        return (<Component onSubmit={this.onSubmit}
                           onChange={this.onSubmit} //on change not supported yet
                           doneEditing={this.props.doneEditing}
                           id={`multiple_stage_input_stage_${stage}`}
                           {...this.props.component_list[stage].input_props}/>)
    }

    getContainerStyle(mode, style){
        var container_style = "multiple_stage_input_container "
        if (style) {
            container_style += style;
        }
        if (mode === "on" && this.props.on_container_additional_style) {
            container_style += " "+this.props.on_container_additional_style;
        }
        return container_style;
    }

    // if the component has a "submit" callback, it can use onSubmit
    // this will save the value and set mode to off
    onSubmit(value){
        this.updatedSavedValues.push(value);
        this.setState({saved_values: this.updatedSavedValues});
        if (this.props.component_list[this.state.stage].route_values) {
            const route_actions = this.props.component_list[this.state.stage].route_values;
            if ("submit" in route_actions
                && (route_actions.submit === "all" || route_actions.submit.indexOf(value) !== -1)
                ) {
                    this.props.onSubmit(this.updatedSavedValues);
            } else if ("go_to" in route_actions
                        && route_actions["go_to"][value]){
                            this.setState({stage: route_actions["go_to"][value]});

            } else {
                this.nextStage()
            }
        } else {
            this.nextStage()
        };

    }

    nextStage(){
        if (this.state.stage + 1 === this.props.component_list.length) {
            // ended
            this.props.onSubmit(this.updatedSavedValues);
        } else {
            // next stage
            this.setState({stage: this.state.stage + 1});
        }
    }




  render() {
      return(
          <div className={this.getContainerStyle(this.state.mode,
                                                 this.props.container_style)}
               onKeyPress={this.onKeyPress}>
               {this.getComponent(this.state.stage)}
          </div>
    )
  }


}


MultipleStageInput.propTypes = {
  component_list: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,

  container_style: PropTypes.string,
}