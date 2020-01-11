import React from "react";

export default class SelectInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      value: props.selected
    };

    this.id = props.id;
    if (!props.selected) {
      this.state.value = Object.keys(props.options)[0];
    }

    this.handleClick = this.handleClick.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.getComponents = this.getComponents.bind(this);
    this.getOptionText = this.getOptionText.bind(this);
  }

  setValue(value) {
    this.setState({ value });
    if (this.props.onSubmit) {
      this.props.onSubmit(this.props.options[value]);
    }
  }

  handleClick(value) {
    this.setValue(value);
    if (!this.props.dont_blur_on_change) {
      this.onBlur();
    }
  }

  onFocus() {
    if (!this.state.expanded) {
      this.setState({ expanded: true });
    }
  }

  onBlur() {
    this.setState({ expanded: false });
  }

  getOptionText(option_text) {
    if (this.props.perform_text_transform) {
      return this.props.text_transform(option_text);
    } else {
      return option_text;
    }
  }

  getComponents(options, expanded, value) {
    if (expanded) {
      var options_divs = [];
      Object.keys(options).forEach(key => {
        options_divs.push(
          <div
            className="select_option"
            onClick={() => {
              this.handleClick(key);
            }}
            id={`select_option_${key}_${this.props.id}`}
            key={`select_option_${key}_${this.props.id}`}
          >
            {this.getOptionText(key)}
          </div>
        );
      });

      return <div className="select_options_container">{[options_divs]}</div>;
    } else {
      return (
        <div className="value_container">
          {this.getOptionText(this.state.value)}
        </div>
      );
    }
  }

  componentDidMount() {
    if (this.props.expanded) {
      this.setState({ expanded: this.props.expanded });
      document.getElementById(this.id).focus();
    }
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={"select_input " + this.props.className}
        onClick={this.onFocus}
        onBlur={this.onBlur}
      >
        {this.getComponents(
          this.props.options,
          this.state.expanded,
          this.state.value
        )}
      </div>
    );
  }
}
