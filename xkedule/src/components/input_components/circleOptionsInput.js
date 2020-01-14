import React from "react";

// Circle option input

export default class CircleOptionsInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: {}
    };
    this.updatedSelectedOptions = {};

    props.options.forEach(option => {
      var selected = 0;
      if (props.preselected && props.preselected.includes(option)) {
        selected = 1;
      }
      this.state.options[option] = selected;
      this.updatedSelectedOptions[option] = selected;
    });

    this.selectOption = this.selectOption.bind(this);
    this.undoSelect = this.undoSelect.bind(this);
    this.getComponentDivs = this.getComponentDivs.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(new_selected) {
    if (this.props.onSubmit) {
      // return selected on list form
      var selected = [];
      this.props.options.forEach(key => {
        if (new_selected[key]) {
          selected.push(key);
        }
      });
      this.props.onSubmit(selected);
    }
  }

  selectOption(option) {
    this.updatedSelectedOptions[option] = 1;
    this.setState({ options: this.updatedSelectedOptions });
    this.onChange(this.updatedSelectedOptions);
    this.forceUpdate(); //due to array deep comparison. other solution is to override componentShouldUpdate
  }

  undoSelect(option) {
    this.updatedSelectedOptions[option] = 0;
    this.setState({ options: this.updatedSelectedOptions });
    this.onChange(this.updatedSelectedOptions);
    this.forceUpdate(); //due to array deep comparison. other solution is to override componentShouldUpdate
  }

  getComponentDivs(options) {
    const options_list = Object.keys(options);
    var div_list = [];
    var className;
    var onClick;
    options_list.forEach(option => {
      className = "circle_option";
      if (options[option]) {
        className += " selected_circle_option";
        onClick = () => {
          this.undoSelect(option);
        };
      } else {
        onClick = () => {
          this.selectOption(option);
        };
      }
      div_list.push(
        <div className={className} onClick={onClick}>
          <div>{option}</div>
        </div>
      );
    });
    return div_list;
  }

  render() {
    return (
      <div className={"circle_options_container " + this.props.className}>
        {this.getComponentDivs(this.state.options)}
      </div>
    );
  }
}
