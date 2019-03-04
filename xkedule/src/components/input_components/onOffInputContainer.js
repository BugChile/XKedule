import React from "react"
import PropTypes from 'prop-types';

// This component IS NOT an input, but holds one. It's used to show ("on" state)
// and hide ("off" state) said input component. The value of the input must be
// saved on a higher component.
//
// Required:
//     - props.off_component: (required) component (or div) shown when off.
//                            this component must receive a "text" prop, which
//                            will show the saved value of the on_component
//
//     - props.on_component: (required) input, shown when on.
//                           must receive a "onChange" callback to save partial
//                           results, a "value" prop that will be the actual
//                           value holder.
//
//     - props.on_component_value: (required) value holder for the input component
//
//     - props.on_component_save:  (required) callback to update input component value
//
//     - props.value_to_summary:   (required IF) if the raw value of the on component
//                                 is different from the value summary shown on the
//                                 off component, a function should be passed on
//                                 this prop to obtain text from the input value
//
// Optional:
//
//     - props.off_component_props: (optional) js object, additional props to be passed
//                                  to the off component
//
//     - props.on_component_props: (optional) js object, additional props to be passed
//                                 to the on component, besides value and onChange
//
//     - props.container_style: (optional) additional css class of the div that
//                              contains both off and on states. Main class is
//                              .on_off_input_container
//
//     - props.on_container_additional_style: (optional) added to the container
//                                            css classes when on component is shown
//
//
//     - props.key_submit_cc: (optional) list of key's charCodes to be used as submit
//
//     - props.submit_on_change: (optional) if true, onChange will submit state
//

export default class OnOffInputContainer extends React.PureComponent {

    _timeoutID;

    constructor(props){
        super(props)
        this.state = {
            mode: "off",
            isManagingFocus: false,
        };

        this.on_component_id = "onOffFocusedChild"

        this.getComponent = this.getComponent.bind(this);
        this.getContainerStyle = this.getContainerStyle.bind(this);
        this.getOnChange = this.getOnChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this._onFocusWrapper = this._onFocusWrapper.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this._onBlurWrapper = this._onBlurWrapper.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.doneEditing = this.doneEditing.bind(this);
    };

    getComponent(mode){
        switch (mode) {
            case "on":
                return <this.props.on_component value={this.props.on_component_value}
                                                onChange={this.getOnChange()}
                                                doneEditing={this.doneEditing}
                                                {...this.props.on_component_props}/>
            case "off":
                var value_summary = "";
                if (this.props.value_to_summary) {
                    value_summary = this.props.value_to_summary(this.props.on_component_value);
                } else {
                    value_summary = this.props.on_component_value;
                }
                return <this.props.off_component text={value_summary}
                                                 {...this.props.off_component_props}/>
        }
    }

    getContainerStyle(mode, style){
        var container_style = "on_off_input_container "
        if (style) {
            container_style += style;
        }
        if (mode === "on" && this.props.on_container_additional_style) {
            container_style += " "+this.props.on_container_additional_style;
        }
        return container_style;
    }

    // if the component has a "finished" state, it can use doneEditing to close
    // itself
    doneEditing(){
        this.setState({isManagingFocus: false});
        this.onBlur();
    }

    getOnChange(){
        if (this.props.submit_on_change) {
            return (
                (value) => {
                        this.props.on_component_save(value);
                        this.setState({isManagingFocus: false});
                        this.onBlur();
                    }
            )
        } else {
            return this.props.on_component_save;
        }
    }

    onFocus(){
        this.setState({mode: "on"});
    }

    onBlur(){
        this.setState({mode: "off"});
    }

    onKeyPress(event){
        if (this.props.key_submit_cc &&
            this.props.key_submit_cc.includes(event.charCode)) {
                this.setState({isManagingFocus: false});
                this.onBlur();
        }
    }


  render() {
      return(
          <div className={this.getContainerStyle(this.state.mode,
                                                 this.props.container_style)}
               tabIndex="-1"
               onFocus={this._onFocusWrapper}
               onClick={this._onFocusWrapper}
               onBlur={this._onBlurWrapper}
               onKeyPress={this.onKeyPress}>
               {this.getComponent(this.state.mode)}
          </div>
    )
  }

  // The following wrappers are required because of the way react handles
  // focus events. It basically waits to see if the blur event comes from
  // a container's child, and if it does, the container doesn't loose focus
  //
  // code from (and more info):
  // https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b

  _onFocusWrapper(){
      // _onFocusWrapper called when the container or one of it's child gains focus
      clearTimeout(this._timeoutID);
      // clearing timeout prevents the Blur
      if (!this.state.isManagingFocus) {
        this.setState({
          isManagingFocus: true,
        });
        this.onFocus();
      }
  }

  _onBlurWrapper(){
      this._timeoutID = setTimeout(() => {
                            if (this.state.isManagingFocus) {
                              this.setState({
                                isManagingFocus: false,
                              });
                              this.onBlur();
                            }
                        }, 0);
  }


}


OnOffInputContainer.propTypes = {
  on_component: PropTypes.func.isRequired,
  off_component: PropTypes.func.isRequired,
  on_component_save: PropTypes.func.isRequired,
  on_component_value: PropTypes.any.isRequired,

  on_component_props: PropTypes.object,
  off_component_props: PropTypes.object,
  container_style: PropTypes.string,
  on_container_additional_style: PropTypes.string,
  value_to_summary: PropTypes.func,
  key_submit_cc: PropTypes.array,
}
