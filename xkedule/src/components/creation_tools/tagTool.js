import React from "react"
import EventTag from "./eventTag"


export default class TagTool extends React.Component {
  constructor(props){
      super(props)

      this.getUnusedTagsDivs = this.getUnusedTagsDivs.bind(this);
    }

    getUnusedTagsDivs(event_tags, user_tags){
        const user_tags_list = Object.values(user_tags);
        var unused_tags_divs = []
        user_tags_list.forEach((tag) => {
            console.log(tag.id, event_tags)
            if (!(tag.id in event_tags)) {
                unused_tags_divs.push(<EventTag  classesCss={`event_form_unused_tag ${tag.style}_tag`}
                           tag_name={tag.name}
                           canDelete={false}
                           key={`unused_tag_${tag.id}`}/>
                       );
            }
        })
        return unused_tags_divs;
    }


  render() {
      return(
              <div className={this.props.classesCss} >
                  <div className="existing_tabs_container">
                    {this.getUnusedTagsDivs(this.props.event_tags, this.props.user_tags)}
                  </div>
                  + Create new tag
              </div>

    )
  }
  }
