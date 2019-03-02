import React from "react"

// This component IS NOT an input, but holds one. It's used to show ("on" state)
// and hide ("off" state) said input component. The value of the input must be
// saved on a higher component.
//
// It receives:
//     - props.off_component: component (or div) shown when off.
//                            this component must receive a "result_sumary" prop, which
//                            will show the saved value of the on_component
//
//     - props.on_component: input, shown when on.
//                           must receive a "save_value" callback to save partial
//                           results. Also a "load_value" prop to load results with the
//                           same format, said format must contain a .result_summary
//                           property which will be shown on the off component
//
//     - props.on_component_value: value holder for the input component
//
//     - props.on_component_save:  callback to update input component value
//
//     - props.container_style: (optional) additional css class of the div that
//                              contains both off and on states. Main class is
//                              .on_off_input_container
//
//     - props.on_container_additional_style: (optional) added to the container
//                                            css classes when on
//
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
        this.onFocus = this.onFocus.bind(this);
        this._onFocusWrapper = this._onFocusWrapper.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this._onBlurWrapper = this._onBlurWrapper.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    };

    getComponent(mode, on_component_value, on_component_save){
        switch (mode) {
            case "on":
                return <this.props.on_component id={this.on_component_id}
                                                value={this.props.on_component_value}
                                                save_callback={this.props.on_component_save}/>
            case "off":
                return <this.props.off_component text={on_component_value}/>
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

    onFocus(){
        this.setState({mode: "on"});
    }

    onBlur(){
        this.setState({mode: "off"});
    }

    onKeyPress(event){
        if (event.charCode == 13) {
            document.getElementById(this.on_component_id).blur();
        }
    }


  render() {
      return(
          <div className={this.getContainerStyle(this.state.mode,
                                                 this.props.container_style)}
               tabIndex="-1"
               onFocus={this._onFocusWrapper}
               onBlur={this._onBlurWrapper}
               onKeyPress={this.onKeyPress}>
              {this.getComponent(this.state.mode,
                                 this.props.on_component_value,
                                 this.props.on_component_save)}
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
