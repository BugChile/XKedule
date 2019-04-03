import React from "react"
import EventFormCard from "./eventFormCard"
import TextLineInput from "../input_components/textLineInput";
import NewTagTool from './newTagTool'
import { decreasingFunctionCompare } from  '../../js_helpers/helpers'

// Requires:
//
//    props.value: Event tag list
//    props.user_tags: User tag list
//    props.onChange: Callback to add tag. Must receive tag element

// Optional:
//
//    props.className: String with css classes

export default class TagTool extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          mode: "index",
          // index:  principal view, shows most used tags, search bar and create
          //         new tag options
          // create: view for creating a new tag
          new_tag_name: "",
          search_value: "",
          show_all: false, // if true, this.suggestions_shown is not taken into account
                           // and all tags are shown

      }

      // number of suggestion shown on index mode
      this.suggestions_shown = 4;

      this.setMode = this.setMode.bind(this);
      this.setNewTagName = this.setNewTagName.bind(this);
      this.setSearchValue = this.setSearchValue.bind(this);
      this.toggleShowAll = this.toggleShowAll.bind(this);
      this.getShownTagsDivs = this.getShownTagsDivs.bind(this);
      this.onSubmitNewTag = this.onSubmitNewTag.bind(this);

    }

    setMode(mode){
        this.setState({mode});
    }

    setNewTagName(new_tag_name){
        this.setState({new_tag_name});
    }

    setSearchValue(search_value){
        this.setState({search_value});
    }

    toggleShowAll(){
        this.setState({show_all: !this.state.show_all})
    }

    getShownTagsDivs(event_tags, user_tags, search_value, show_all){
        var user_tags_list = Object.values(user_tags);
        user_tags_list = user_tags_list.filter(tag => !(tag.id in event_tags));

        // filter
        if (search_value) {
            // filter by search value
            // search is case insensitive
            user_tags_list = user_tags_list.filter(tag =>
                        tag.name.match(new RegExp(search_value, "i")));
        } else {
            // filter by most used
            user_tags_list = user_tags_list.sort((a, b) =>
                                                    {return decreasingFunctionCompare(a.actual_uses, b.actual_uses)});
        }

        // if not show all, show only this.suggestions_shown number of tags
        if (!show_all) {
            user_tags_list = user_tags_list.slice(0, this.suggestions_shown);
        }

        // generate tags
        if (user_tags_list.length === 0) {
            // no tags found
            return (<span><i>No results found</i></span>)
        } else {
            var unused_tags_divs = []
            user_tags_list.forEach((tag) => {
                unused_tags_divs.push(<EventFormCard  className={`event_form_card ${tag.style}_tag`}
                               element={tag}
                               key={`unused_tag_${tag.id}`}
                               onAdd={() => {this.props.onChange(tag)}}/>
                           );
            });
            return unused_tags_divs;
        }

    }

    onSubmitNewTag(tag){
        this.props.onCreateNewTag(tag);
        this.setMode("index")
    }




  render() {
      if (this.state.mode === "index") {
          return (
              <div className={this.props.className} >
                  <div className="card_container">
                    <TextLineInput placeholder="Search by tag name"
                                   value={this.state.search_value}
                                   onChange={this.setSearchValue}/>
                  </div>
                  <div className="horizontal_flex navigation">
                      <div className="right" >
                            {this.state.search_value ? "Search results" : "Most used"}
                      </div>
                      <div className="left" >
                          <a className="clickable_anchor" onClick={this.toggleShowAll}>
                              {this.state.show_all ? "Show less" : "Show all"}
                          </a>
                      </div>
                  </div>
                  <div className="card_container">
                    {this.getShownTagsDivs(this.props.value,
                                           this.props.user_tags,
                                           this.state.search_value,
                                           this.state.show_all)}
                  </div>
                  <div className="horizontal_flex shrink_row">
                      <div className="button" onClick={() => {this.setMode("create")}}>
                          Create new tag
                      </div>
                      <a className="clickable_anchor"
                           onClick={this.props.doneEditing}>
                          Done
                      </a>
                  </div>

              </div>
          )
      }
      return(
                <NewTagTool className={this.props.className}
                                  onSubmit={this.onSubmitNewTag}
                                  doneEditing={() => this.setMode("index")}/>
    )
  }
  }
