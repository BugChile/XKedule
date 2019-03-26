import React from "react"
import TextLineInput from "../input_components/textLineInput";

export default class NewTagTool extends React.PureComponent {
  constructor(props){
      super(props)
      this.tagColors = ["lapis", "ocean", "seafoam", "blonde", "tangerine", "rose", "lilac", "violet"];
      this.state = {
          picked_color: null,
          new_tag_name: "",
          chosen_color: "",
      }

      this.setChosenColor = this.setChosenColor.bind(this);
      this.setNewTagName = this.setNewTagName.bind(this);
      this.createAndAddTag = this.createAndAddTag.bind(this);

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

  createAndAddTag(){
      const tag = {
          name: this.state.new_tag_name,
          style: this.state.chosen_color,
          actual_uses: 0
      };
      this.props.onSubmit(tag);
  }

  getColorChoiceDivs(chosen_color){
      var color_choice_divs = [];
      var div_classes = "";
      var div_children = [];
      this.tagColors.forEach((color) => {
          div_classes = `${color}_tag color_choice`
          div_children = [];
          if (chosen_color === color) {
              div_classes += " chosen_color"
              div_children.push(<svg id="accepted_svg" key="accepted_svg" className="accepted_svg" viewBox="0 0 53 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.611538 22.55C0.203846 22.14 0 21.525 0 21.115C0 20.705 0.203846 20.09 0.611538 19.68L3.46538 16.81C4.28077 15.99 5.50385 15.99 6.31923 16.81L6.52308 17.015L17.7346 29.11C18.1423 29.52 18.7538 29.52 19.1615 29.11L46.4769 0.615H46.6808C47.4962 -0.205 48.7192 -0.205 49.5346 0.615L52.3885 3.485C53.2038 4.305 53.2038 5.535 52.3885 6.355L19.7731 40.385C19.3654 40.795 18.9577 41 18.3462 41C17.7346 41 17.3269 40.795 16.9192 40.385L1.01923 23.165L0.611538  22.55Z" fill="white"/>
                                </svg>
                        )
          }
          color_choice_divs.push(
              <div className={div_classes}
                   onClick={() => this.setChosenColor(color)}
                   key={`${color}_choice_div`}>
                        {div_children}
                   </div>
          )
      })
      return color_choice_divs;
  }


  render() {
      return(
              <div className={this.props.className}>
                  <TextLineInput placeholder="New tag name"
                                 value={this.state.new_tag_name}
                                 onChange={this.setNewTagName}/>
                  <span>
                        Tag color
                  </span>
                  <div className="tag_color_picker">
                      {this.getColorChoiceDivs(this.state.chosen_color)}
                  </div>
                  <div className="horizontal_flex" style={{margin: "0 auto"}}>
                      <div className="button" onClick={this.createAndAddTag}>
                          Create an add new tag
                      </div>
                      <a className="clickable_anchor"
                           onClick={this.props.doneEditing}>
                          Done
                      </a>
                  </div>


              </div>

    )
  }
  }
