import React from "react";

export default class EventFormCard extends React.PureComponent {
  // Cards are used to show elements of the event being created/edited. These
  // elements could be:
  //    Tags
  //    Links
  // They must have at least the element.name property
  // They can be operated through functions passed as props (for further info,
  // read getTagOptions function specifications)
  constructor(props) {
    super(props);
    this.getTagOptions = this.getTagOptions.bind(this);
  }

  getTagOptions(index) {
    // possible options:
    // onDelete: pass a delete function on props and a trash button will appear
    //           this function should receive the to-be-erased element
    // onRemove: pass a delete function on props and a 'x' button will appear
    //           this function should receive the to-be-removed element
    // onEdit:   pass an edit function on props and an edit symbol will appear
    //           said function should receive the to-be-edited element
    // onAdd:    pass an add function and a '+' symbol will appear
    //           said function should receive the to-be-added element
    // onGoTo:   pass a https link and a 'go-to' symbol will appear
    var options_div = [];
    if (this.props.onGoTo) {
      options_div.push(
        <i
          key={`onGoTo${index}`}
          className="fas fa-external-link-square-alt"
          onClick={() => {
            window.open(this.props.onGoTo);
          }}
        ></i>
      );
    }
    if (this.props.onAdd) {
      options_div.push(
        <i
          key={`onAdd${index}`}
          className="fas fa-plus"
          onClick={() => {
            this.props.onAdd(this.props.element);
          }}
        ></i>
      );
    }
    if (this.props.onRemove) {
      options_div.push(
        <i
          key={`onRemove${index}`}
          className="fas fa-times"
          onClick={() => {
            this.props.onRemove(this.props.element);
          }}
        ></i>
      );
    }
    if (this.props.onDelete) {
      options_div.push(
        <i
          key={`onDelete${index}`}
          className="fas fa-trash-alt"
          onClick={() => {
            this.props.onDelete(this.props.element);
          }}
        ></i>
      );
    }
    return options_div;
  }

  render() {
    return (
      <div
        className={this.props.className}
        onFocus={this.onFocusInput}
        onBlur={this.onBlurInput}
        key={`eventForm${this.props.index}`}
      >
        <span>{this.props.element.name}</span>
        <div className="event_form_card_options_container">
          {this.getTagOptions(this.props.index)}
        </div>
      </div>
    );
  }
}
