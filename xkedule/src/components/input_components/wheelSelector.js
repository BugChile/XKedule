import React from "react";
import DownArrow from "../svgs/DownArrow";
import UpArrow from "../svgs/UpArrow";

// Wheel selector

export default class WheelSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      value: "",
      keyboard_mode: false, // user enters value with keyboard. Activated
      // when center wheel value is clicked
      keyboard_mode_value: "", // when on keyboard mode, this keeps the
      // possible new value until the new one
      // is discarded or accepted. If the later
      // is the case, this will be the new value
      autocomplete_best_match: "" // when on keyboard mode,
      // autocomplete will suggest best match
    };

    if (!props.value) {
      this.mode = "independent";
    } else {
      this.mode = "messenger"; // send the value up when it changes
    }

    this._setValue = this._setValue.bind(this);
    this._setPosition = this._setPosition.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.getOptionDivs = this.getOptionDivs.bind(this);
    this.getValueDiv = this.getValueDiv.bind(this);
    this.moveBack = this.moveBack.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.keyboardModeOn = this.keyboardModeOn.bind(this);
    this.keyboardModeOff = this.keyboardModeOff.bind(this);
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
    this.handleKeyDownInput = this.handleKeyDownInput.bind(this);
    this.getBestMatch = this.getBestMatch.bind(this);
  }

  // _setValue and _setPosition shouldn't be used outside the valueChange function
  _setValue(value) {
    this.setState({ value });
    if (this.mode === "messenger") {
      this.props.onChange(value);
    }
  }

  _setPosition(position) {
    this.setState({ position });
  }

  // valueChange manages value setting by value or position, and keeps them
  // synced
  valueChange(value, mode) {
    // value is be the actual value when mode === "value", and the position
    // when mode === "position"
    var new_position;
    var new_value;
    switch (mode) {
      case "value":
        if (this.props.options.includes(value)) {
          new_position = this.props.options.indexOf(value);
          new_value = value;
        } else {
          let error = {
            code: 300,
            message: `Wheel value "${value}" not a valid option`
          };
          throw error;
        }
        break;
      case "position":
        if (value >= 0 && value < this.props.options.length) {
          new_position = value;
          new_value = this.props.options[value];
        } else {
          let error = {
            code: 300,
            message: `Wheel position "${value}" out of options' range "[0, ${this
              .props.options.length - 1}]"`
          };
          throw error;
        }
        break;
      default:
        let error = {
          code: 300,
          message: "Warning: should not enter in this case."
        };
        throw error;
    }
    if (new_value === this.props.options[new_position]) {
      this._setPosition(new_position);
      this._setValue(new_value);
    } else {
      let error = { code: 300, message: "Value change unsuccessful" };
      throw error;
    }
  }

  moveBack() {
    var new_position;
    if (this.state.position === 0) {
      new_position = this.props.options.length - 1;
    } else {
      new_position = this.state.position - 1;
    }
    this.valueChange(new_position, "position");
  }

  moveForward() {
    var new_position;
    if (this.state.position + 1 === this.props.options.length) {
      new_position = 0;
    } else {
      new_position = this.state.position + 1;
    }
    this.valueChange(new_position, "position");
  }

  getOptionDivs(
    options,
    position,
    keyboard_mode,
    keyboard_mode_value,
    autocomplete_best_match
  ) {
    var option_divs = [];
    var index = position - 1;
    if (index < 0) {
      index = options.length + index;
    }
    for (var i = 0; i < 3; i++) {
      if (index === position) {
        option_divs.push(
          this.getValueDiv(
            index,
            options,
            keyboard_mode,
            keyboard_mode_value,
            autocomplete_best_match
          )
        );
      } else {
        if (options[index]) {
          option_divs.push(
            <div className="wheel_selector_option" key={`wheel_selection_${i}`}>
              {options[index]}
            </div>
          );
        } else {
          option_divs.push(
            <div
              className="wheel_selector_option"
              key={`wheel_selection_${i}`}
            ></div>
          );
        }
      }

      index = (index + 1) % options.length;
    }
    return option_divs;
  }

  getValueDiv(
    index,
    options,
    keyboard_mode,
    keyboard_mode_value,
    autocomplete_best_match
  ) {
    var value_div;
    const props = {
      className: "wheel_selector_actual_value",
      onKeyPress: this.handleKeyboardInput,
      onKeyDown: this.handleKeyDownInput, //non printables like delete
      tabIndex: "-1",
      onFocus: this.keyboardModeOn,
      onBlur: this.keyboardModeOff,
      key: `wheel_selection_actual_value`
    };
    if (keyboard_mode) {
      const auto_complete_prefix = autocomplete_best_match.slice(
        0,
        autocomplete_best_match.indexOf(keyboard_mode_value)
      );
      const auto_complete_suffix = autocomplete_best_match.slice(
        autocomplete_best_match.indexOf(keyboard_mode_value) +
          keyboard_mode_value.length
      );

      value_div = (
        <div {...props} id="wheel_selection_editing_value">
          <span className="autocomplete">{auto_complete_prefix}</span>
          <span className="">{keyboard_mode_value}</span>
          <span className="autocomplete">{auto_complete_suffix}</span>
        </div>
      );
    } else {
      value_div = <div {...props}>{options[index]}</div>;
    }
    return value_div;
  }

  keyboardModeOn() {
    this.setState({ keyboard_mode: true });
  }

  keyboardModeOff() {
    if (this.state.autocomplete_best_match !== "") {
      this.valueChange(this.state.autocomplete_best_match, "value");
    }
    this.setState({ keyboard_mode: false });
    this.setState({ keyboard_mode_value: "" });
    this.setState({ autocomplete_best_match: "" });
    document.getElementById("wheel_selection_editing_value").blur();
  }

  handleKeyboardInput(event) {
    // filter viable new values in keyboard mode given the actual keyboard
    // mode value and the new char, filtering from options
    var possible_new_value = this.state.keyboard_mode_value + event.key;
    var viable_options = this.props.options.filter(option =>
      option.includes(possible_new_value)
    );

    if (viable_options.length === 0) {
      console.log("Not valid");
      //handle
    } else {
      // char is saved on possible new value
      this.setState({ keyboard_mode_value: possible_new_value });

      // calculate best match
      this.setState({
        autocomplete_best_match: this.getBestMatch(viable_options)
      });
    }
  }

  handleKeyDownInput(event) {
    if (event.keyCode === 8) {
      // delete key
      var possible_new_value = this.state.keyboard_mode_value.slice(0, -1);
      this.setState({ keyboard_mode_value: possible_new_value });
      if (possible_new_value === "") {
        this.setState({ autocomplete_best_match: "" });
      } else {
        var viable_options = this.props.options.filter(option =>
          option.includes(possible_new_value)
        );
        this.setState({
          autocomplete_best_match: this.getBestMatch(viable_options)
        });
      }
    }
  }

  getBestMatch(viable_options) {
    var best_match;
    if (this.props.best_match_getter) {
      //handle
    } else {
      best_match = viable_options[0];
    }
    return best_match;
  }

  componentDidMount() {
    if (this.props.value) {
      this.valueChange(this.props.value, "value");
    }
  }

  render() {
    return (
      <div className={"wheel_selector_container " + this.props.className}>
        <div className="wheel_selector_next_control" onClick={this.moveBack}>
          <UpArrow />
        </div>
        {this.getOptionDivs(
          this.props.options,
          this.state.position,
          this.state.keyboard_mode,
          this.state.keyboard_mode_value,
          this.state.autocomplete_best_match
        )}
        <div className="wheel_selector_next_control" onClick={this.moveForward}>
          <DownArrow />
        </div>
      </div>
    );
  }
}
