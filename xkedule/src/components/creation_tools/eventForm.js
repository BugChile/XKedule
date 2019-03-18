import React from "react"
import EventFormCard from "./eventFormCard"
import TagTool from "./tagTool"
import LinkTool from "./linkTool"
import RepeatTool from "./repeatTool"
import OnOffInputContainer from "../input_components/onOffInputContainer";
import MultipleStageInput from "../input_components/multipleStageInput";
import SimpleInputOffState from "../input_components/simpleInputOffState";
import SelectInput from "../input_components/selectInput";
import TextLineInput from "../input_components/textLineInput";
import HourMinuteInput from "../input_components/hourMinuteInput";
import { dateToWritenDate, dateToHourMinute } from "../../js_helpers/parsers";
import Calendar from 'react-calendar';

export default class EventForm extends React.PureComponent {
  constructor(props){
      super(props)
      this.state = {
          title: "",
          date: new Date(),
          from: new Date(),
          to: new Date(),
          minDateRepeatEnd: new Date(),
          eventTags: {},
          eventLinks: {},
      };

      // the following are used because of stacked setState calls on prevState
      // based operations
      this.updatedEventTags = {} //required for stacked setState calls, all
      // eventTags updates should be done on updatedEventTags before a call of
      // this.setState({eventTags: this.updatedEventTags})
      this.updatedEventLinks = {} //required for stacked setState calls, all
      // eventLinks updates should be done on updatedEventTags before a call of
      // this.setState({eventLinks: this.updatedEventLinks})

      this.setTitle = this.setTitle.bind(this);
      this.setDate = this.setDate.bind(this);
      this.setFrom = this.setFrom.bind(this);
      this.setFromHourMinute = this.setFromHourMinute.bind(this);
      this.setTo = this.setTo.bind(this);
      this.setToHourMinute = this.setToHourMinute.bind(this);
      this.getEventTagDivs = this.getEventTagDivs.bind(this);
      this.getEventLinkDivs = this.getEventLinkDivs.bind(this);
      this.loadEvent = this.loadEvent.bind(this);
      this.loadEventTags = this.loadEventTags.bind(this);
      this.addEventTag = this.addEventTag.bind(this);
      this.createAndAddNewTag = this.createAndAddNewTag.bind(this);
      this.removeEventTag = this.removeEventTag.bind(this);
      this.loadEventLinks = this.loadEventLinks.bind(this);
      this.addEventLink = this.addEventLink.bind(this);
      this.removeEventLink = this.removeEventLink.bind(this);

  };

  setTitle(title){
      this.setState({title})
  }

  setDate(date){
      this.setState({date})
  }

  setFrom(from){
     this.setState({from}, () => {
         if (this.state.to < this.state.from) {
             this.setTo(from);
         }
     })
  }

  setFromHourMinute(from_hour_minute){ // format: {hour: H, minute: m}, H and m are integers
      var date_from = new Date(this.state.from.getTime());
      date_from.setHours(from_hour_minute.hour);
      date_from.setMinutes(from_hour_minute.minute);
      this.setFrom(date_from);
  }

  setTo(to){
      this.setState({to}, () => {
          if (this.state.to < this.state.from) {
              this.setFrom(to);
          }
      })
  }

  setToHourMinute(to_hour_minute){ // format: {hour: H, minute: m}, H and m are integers
      var date_to = new Date(this.state.to.getTime());
      date_to.setHours(to_hour_minute.hour);
      date_to.setMinutes(to_hour_minute.minute);
      this.setTo(date_to);
  }

  getEventTagDivs(event_tags){
      var tag_divs = [];
      const event_tags_list = Object.values(event_tags)
      event_tags_list.forEach((tag) => {
          tag_divs.push(<EventFormCard  className={`event_form_big_input event_form_card ${tag.style}_tag`}
                     element={tag}
                     onDelete={this.removeEventTag}/>
                 );
      })
      return tag_divs;
  }

  getEventLinkDivs(event_links){
      var link_divs = [];
      const event_links_list = Object.values(event_links)
      event_links_list.forEach((link) => {
          link_divs.push(<EventFormCard  className={`event_form_big_input event_form_card grey_tag`}
                     element={link}
                     onDelete={this.removeEventLink}
                     onGoTo={link.href}/>
                 );
      })
      return link_divs;
  }

  loadEvent(_event){
      this.setTitle(_event["title"]);
      const from_date = new Date([_event["date_start"]]);
      const from_hour = {hour: from_date.getHours(), minute: from_date.getMinutes()};

      const to_date = new Date([_event["date_end"]]);
      const to_hour = {hour: to_date.getHours(), minute: to_date.getMinutes()};

      this.setDate(from_date);
      this.setFrom(from_date);
      this.setTo(to_date);
  }

  loadEventTags(editing_event, user_tags){
      editing_event["tag_ids"].forEach((tag_id) => {
          this.addEventTag(user_tags[tag_id]);
      })
  }

  addEventTag(tag){
      const new_key_value_pair = {};
      new_key_value_pair[tag.id] = tag;
      this.updatedEventTags = {...new_key_value_pair, ...this.updatedEventTags};
      // above update is instantaneus instead of setState, so if react stacks
      // setState calls we use the updatedEventTags as a reference
      this.setState({ eventTags : this.updatedEventTags})
  }

  createAndAddNewTag(new_tag){ //tag format {name: string, style: string, actual_uses: 0}
      const new_id = (Object.keys(this.props.user_tags).length + 1).toString();
      const tag = {
          id: new_id
      };
      Object.assign(tag, new_tag);
      this.addEventTag(tag);
  }

  removeEventTag(tag){
      delete this.updatedEventTags[tag.id];
      this.updatedEventTags = {...this.updatedEventTags}; // deep copy to trigger re-render
      // above update is instantaneus instead of setState, so if react stacks
      // setState calls we use the updatedEventTags as a reference
      this.setState({ eventTags : this.updatedEventTags})
  }

  loadEventLinks(editing_event){
      this.updatedEventLinks = {...editing_event["links"]}
      this.setState({ eventLinks : this.updatedEventLinks})
  }

  addEventLink(link){
      const new_key_value_pair = {};
      new_key_value_pair[link.name] = link;
      this.updatedEventLinks = {...new_key_value_pair, ...this.updatedEventLinks};
      // above update is instantaneus instead of setState, so if react stacks
      // setState calls we use the updatedEventLinks as a reference
      this.setState({ eventLinks : this.updatedEventLinks})
  }

  removeEventLink(link){
      delete this.updatedEventLinks[link.name];
      this.updatedEventLinks = {...this.updatedEventLinks}; // deep copy to trigger re-render
      // above update is instantaneus instead of setState, so if react stacks
      // setState calls we use the updatedEventLinks as a reference
      this.setState({ eventLinks : this.updatedEventLinks})
  }

  componentDidMount(){
      if (this.props.event) {
          this.loadEvent(this.props.event);
          this.loadEventTags(this.props.event, this.props.user_tags);
          this.loadEventLinks(this.props.event);
      }
  }

  render() {
      return(
          <div id = "event_form" className="event_form" key="event_form">
              <div  className="event_form_whole_row right_aligned_text">
                    <span id="event_form_discard"
                          onClick={this.props.close_event_form}>
                    Cancel
                    </span>
              </div>

              <span> title: </span>
              <TextLineInput
                value={this.state.title}
                onChange={this.setTitle}
                className="event_form_big_input grey_tag"
                enter_key_submit
              />
              <div className="event_form_input_gap"></div>

              <span> date: </span>
              <OnOffInputContainer
                on_component_value={this.state.date}
                on_component_save={this.setDate}
                on_component={Calendar}
                value_to_summary={dateToWritenDate}
                off_component={SimpleInputOffState}
                container_style='event_form_big_input grey_tag event_form_on_off'
                on_component_props={{minDate: this.props.current_time,
                                     className: "input_calendar"}}
                submit_on_change
              />
              <div className="event_form_input_gap"></div>

              <span> from: </span>
              <OnOffInputContainer
                on_component_value={this.state.from}
                on_component_save={this.setFromHourMinute}
                on_component={HourMinuteInput}
                value_to_summary={dateToHourMinute}
                off_component={SimpleInputOffState}
                container_style='event_form_small_input grey_tag event_form_on_off'
              />

              <span> to: </span>
              <OnOffInputContainer
                on_component_value={this.state.to}
                on_component_save={this.setToHourMinute}
                on_component={HourMinuteInput}
                value_to_summary={dateToHourMinute}
                off_component={SimpleInputOffState}
                container_style='event_form_small_input grey_tag event_form_on_off'
              />
              <div className="event_form_input_gap"></div>

              <span> repeat: </span>
              <OnOffInputContainer
                  on_component_value={this.state.eventTags}
                  on_component_save={this.addEventTag}
                  on_component={RepeatTool}
                  off_component={SimpleInputOffState}
                  container_style='event_form_big_input grey_tag event_form_on_off'
                  on_component_props={{className: "repeat_tool", event_date: this.state.date}}
                 off_text="Never"
                 />
              <div className="event_form_input_gap"></div>



              <span> tags: </span>
             {this.getEventTagDivs(this.state.eventTags)}
             <OnOffInputContainer
                 on_component_value={this.state.eventTags}
                 on_component_save={this.addEventTag}
                 on_component={TagTool}
                 off_component={SimpleInputOffState}
                 container_style='event_form_big_input grey_tag event_form_on_off'
                 on_component_props={{className: "tag_tool",
                                      user_tags: this.props.user_tags,
                                      onCreateNewTag: this.createAndAddNewTag}}
                off_text="+ Add tags"
                />
                <div className="event_form_input_gap"></div>


                <span> links: </span>
                    {this.getEventLinkDivs(this.state.eventLinks)}
                    <OnOffInputContainer
                        on_component_value={this.state.eventLinks}
                        on_component_save={this.addEventLink}
                        on_component={LinkTool}
                        off_component={SimpleInputOffState}
                        container_style='event_form_big_input grey_tag event_form_on_off'
                        on_component_props={{className: "link_tool",
                                             }}
                       off_text="+ Add links"
                       />


          </div>
    )
  }
  }
