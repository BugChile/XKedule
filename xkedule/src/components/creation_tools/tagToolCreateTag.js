import React from "react"
import InputForm from "./inputForm";

export default class TagToolCreateTag extends React.PureComponent {
  constructor(props){
      super(props)
      this.tagColors = ["lapis", "ocean", "seafoam", "blonde", "white", "tangerine", "rose", "lilac", "violet", "grey"];
      this.state = {
          picked_color: null,
          new_tag_name: "",
          chosen_color: "",
      }
      this.setValue = this.setValue.bind(this);
      this.setChosenColor = this.setChosenColor.bind(this);
      this.setNewTagName = this.setNewTagName.bind(this);

  };



  setNewTagName(new_tag_name){
      this.setState({new_tag_name});
  }

  setChosenColor(chosen_color){
      if (chosen_color !== this.state.chosen_color) {
          this.setState({chosen_color})
      } else { // double click on color cleans selection
          this.setState({chosen_color: ""})
      }
  }

  setValue(event, target){
      if(target ==="new_tag_name"){
        this.setNewTagName(event.target.value)
      }
  }

  getColorChoiceDivs(chosen_color){
      var color_choice_divs = [];
      var div_classes = ""
      this.tagColors.forEach((color) => {
          div_classes = `${color}_tag color_choice`
          if (chosen_color === color) {
              div_classes += " chosen_color"
          }
          color_choice_divs.push(
              <div className={div_classes}
                   onClick={() => this.setChosenColor(color)}></div>
          )
      })
      return color_choice_divs;
  }


  render() {
      return(
              <div>
                  <h3>
                      Create new tag
                  </h3>
                  <InputForm
                    classesCss='input big_input'
                    value={this.state.new_tag_name}
                    onChange={this.setValue}
                    placeholder="Enter tag name"
                    type="new_tag_name"
                  />
                  <div className="tag_color_picker_container">
                      <p>
                          Pick tag color
                      </p>
                      <div className="tag_color_picker">
                          {this.getColorChoiceDivs(this.state.chosen_color)}
                      </div>
                  </div>
                  <a className="clickable_anchor"
                       onClick={() => {this.props.toIndexMode("index")}}>
                      Cancel
                  </a>

              </div>

    )
  }
  }
