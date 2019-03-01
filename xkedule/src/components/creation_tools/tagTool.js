import React from "react"
import EventFormCard from "./eventFormCard"
import InputForm from "./inputForm";
import TagToolCreateTag from './tagToolCreateTag'



export default class TagTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          mode: "index",
          // index:  principal view, shows most used tags, search bar and create
          //         new tag options
          // create: view for creating a new tag
          new_tag_name: ""

      }

      this.setMode = this.setMode.bind(this);
      this.setNewTagName = this.setNewTagName.bind(this);
      this.getUnusedTagsDivs = this.getUnusedTagsDivs.bind(this);
    }

    setMode(mode){
        this.setState({mode});
    }

    setNewTagName(new_tag_name){
        this.setState({new_tag_name});
    }

    getUnusedTagsDivs(event_tags, user_tags){
        const user_tags_list = Object.values(user_tags);
        var unused_tags_divs = []
        user_tags_list.forEach((tag) => {
            if (!(tag.id in event_tags)) {
                unused_tags_divs.push(<EventFormCard  classesCss={`event_form_unused_tag ${tag.style}_tag`}
                           element={tag}
                           key={`unused_tag_${tag.id}`}
                           onAdd={() => {this.props.add_tag_to_event_callback(tag);}}/>
                       );
            }
        })
        return unused_tags_divs;
    }

    generateComponents(mode){
        var components = []
        switch (mode) {
            case "index":
                components.push(
                    <div className="existing_tabs_container">
                      {this.getUnusedTagsDivs(this.props.event_tags, this.props.user_tags)}
                    </div>
                )
                components.push(
                    <a className="clickable_anchor"
                         onClick={() => {this.setMode("create")}}>
                        + Create new tag
                    </a>
                )
                break;
            case "create":
                components.push(
                    <TagToolCreateTag toIndexMode={() => this.setMode("index")}/>
                )
                components.push(

                )
                break;

        }
        return components
    }




  render() {
      return(
              <div className={this.props.classesCss} >
                  {this.generateComponents(this.state.mode)}
              </div>
    )
  }
  }
