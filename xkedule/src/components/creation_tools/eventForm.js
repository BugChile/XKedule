import React from "react"
import InputForm from "./inputForm";
import EventFormCard from "./eventFormCard"
import TimeInputForm from "./timeInputForm";
import SelectInputForm from "./selectInputForm";
import OptionsInputForm from "./optionsRepeatInput";
import TagTool from "./tagTool"
import LinkTool from "./linkTool"
import MyCalendar from "./myCalendar";
import OnOffInputContainer from "../input_components/onOffInputContainer";
import SimpleInputOffState from "../input_components/simpleInputOffState";
import TextLineInput from "../input_components/textLineInput";
import HourMinuteInput from "../input_components/hourMinuteInput";
import { dateToWritenDate, dateToHourMinute } from "../../js_helpers/parsers";
import Calendar from 'react-calendar/dist/entry.nostyle';

export default class EventForm extends React.PureComponent {
  constructor(props){
      super(props)
      this.dayDict = { "Mo":0, "Tu":1, "We":2, "Th":3, "Fr":4, "Sa":5, "Su":6 };
      this.dayWeekDict = { 1:"Mo", 2:"Tu", 3:"We", 4:"Th", 5:"Fr", 6:"Sa", 0:"Su" };
      this.dictReversed = {1:0, 0:1};
      this.state = {
          title: "",
          date: new Date(),
          from: new Date(),
          to: new Date(),
          minTo:"00:00",
          today: new Date(),
          minDateRepeat: new Date(),
          isToTimeDisabled:true,
          repeat:[0,0,0,0,0,0,0],
          repeatDays:[0,0,0,0,0,0,0],
          fromDayDate: new Date(),
          lastDayRepeatDate: new Date(),
          lastDayRepeat: [0],
          hiddenCalendarEvent: "hidden",
          hiddenCalendarRepeat: "hidden",
          hiddenTagTool: "hidden",
          hiddenLinkTool: "hidden",
          hiddenRepeat:"hidden",
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
      this.setValue = this.setValue.bind(this);
      this.checkTime = this.checkTime.bind(this);
      this.displayOptions = this.displayOptions.bind(this);
      this.handleClickDayRepeat = this.handleClickDayRepeat.bind(this);
      this.displayCalendar = this.displayCalendar.bind(this);
      this.displayCalendarRepeat = this.displayCalendarRepeat.bind(this);
      this.toggleTagTool = this.toggleTagTool.bind(this);
      this.toggleLinkTool = this.toggleLinkTool.bind(this);
      this.onChangeCalendar = this.onChangeCalendar.bind(this);
      this.onChangeCalendarRepeat = this.onChangeCalendarRepeat.bind(this);
      this.toggleHiddenElement = this.toggleHiddenElement.bind(this);
      this.getEventTagDivs = this.getEventTagDivs.bind(this);
      this.getEventLinkDivs = this.getEventLinkDivs.bind(this);
      this.loadEvent = this.loadEvent.bind(this);
      this.loadEventTags = this.loadEventTags.bind(this);
      this.addEventTag = this.addEventTag.bind(this);
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



  setValue(event, target){
      if(target ==="title"){
        this.setTitle(event.target.value)
      }else if(target ==="from"){
            this.setState({from: event.target.value, isToTimeDisabled:true, minTo:event.target.value, to:""})
        if (event.target.value){
        this.setFrom(event.target.value)
        }
      }else if(target ==="to"){
        this.setState({to: event.target.value})

      }
  }

  checkTime(value){
    if (value <= this.state.from){
        this.setState({to:""})
    }
  }
  displayOptions(){
      if(this.state.hiddenRepeat){
        this.setState({hiddenRepeat:""})
      }else{
        this.setState({hiddenRepeat:"hidden"})
      }
      if(!this.state.hiddenCalendarRepeat){
        this.setState({hiddenCalendarRepeat:"hidden"})
      }


    var dayWeek = new Date(this.state.date[0]).getDay();
    if(this.state.date[0] && this.state.hiddenRepeat && this.state.repeatDays[this.dayDict[this.dayWeekDict[dayWeek]]] === 0){
      this.handleClickDayRepeat(this.dayWeekDict[dayWeek]);
    }

    var isRepeating = 0;
    this.state.repeat.forEach((day)=>{
      if(day){isRepeating = 1}
    })
    if (!isRepeating){
      this.setState({lastDayRepeat:[0], lastDayRepeatDate:new Date()})
    }

  }
  handleClickDayRepeat(day){
    var newOptions = this.state.repeat.slice();
    var newOptionsValues = this.state.repeatDays.slice();
    newOptions[this.dayDict[day]] = this.dictReversed[newOptions[this.dayDict[day]]];
    newOptionsValues[this.dayDict[day]] = day;

    if(this.state.repeatDays[this.dayDict[day]]){
      newOptionsValues[this.dayDict[day]] = 0;
    }
    this.setState({repeat:newOptions, repeatDays:newOptionsValues})

  }

  displayCalendar(){
    if (!this.state.date[0]){
      this.setState({date:[this.state.fromDayDate.toLocaleDateString("en-GB")]})
    }
    if(this.state.hiddenCalendarEvent){
      this.setState({hiddenCalendarEvent:""})
    }else{
      this.setState({hiddenCalendarEvent:"hidden"})
    }
  }

  toggleLinkTool(){
      if (this.state.hiddenLinkTool === "") {
          this.setState({hiddenLinkTool: "hidden"});
      } else {
          this.setState({hiddenLinkTool: ""});
      }
  }

  toggleTagTool(){
      if (this.state.hiddenTagTool === "") {
          this.setState({hiddenTagTool: "hidden"});
      } else {
          this.setState({hiddenTagTool: ""});
      }
  }

  toggleHiddenElement(current_mode, element){
    switch (current_mode) {
        case "hidden":
            return "";
        case "":
            return element;
    }
}

  onChangeCalendar(newDate){
    if(this.state.hiddenCalendarEvent){
      this.setState({hiddenCalendarEvent:""})
    }else{
      this.setState({hiddenCalendarEvent:"hidden"})
    }
    this.setState({date:[newDate.toLocaleDateString("en-GB")], fromDayDate:newDate, minDateRepeat:newDate})

  }

  displayCalendarRepeat(){
    if(this.state.hiddenCalendarRepeat){
      this.setState({hiddenCalendarRepeat:""})
    }else{
      this.setState({hiddenCalendarRepeat:"hidden"})
    }
  }

  onChangeCalendarRepeat(newDate){

    if(this.state.hiddenCalendarRepeat){
      this.setState({hiddenCalendarRepeat:""})
    }else{
      this.setState({hiddenCalendarRepeat:"hidden"})
    }
    this.setState({lastDayRepeat:[newDate.toLocaleDateString("en-GB")], lastDayRepeatDate:newDate})
  }

  getEventTagDivs(event_tags){
      var tag_divs = [];
      const event_tags_list = Object.values(event_tags)
      event_tags_list.forEach((tag) => {
          tag_divs.push(<EventFormCard  classesCss={`event_form_card ${tag.style}_tag`}
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
          link_divs.push(<EventFormCard  classesCss={`event_form_card grey_tag`}
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
              <OnOffInputContainer
                on_component_value={this.state.title}
                on_component_save={this.setTitle}
                off_component={SimpleInputOffState}
                on_component={TextLineInput}
                container_style='event_form_big_input grey_tag event_form_on_off'
                on_container_additional_style="white_tag"
                key_submit_cc={[13]}
              />

              <span> date: </span>
              <OnOffInputContainer
                on_component_value={this.state.date}
                on_component_save={this.setDate}
                on_component={Calendar}
                value_to_summary={dateToWritenDate}
                off_component={SimpleInputOffState}
                container_style='event_form_big_input grey_tag event_form_on_off'
                on_component_props={{minDate: this.state.today,
                                     className: "input_calendar"}}
                submit_on_change
              />

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

              <span> repeat: </span>

              <SelectInputForm
                classesCss='event_form_big_input grey_tag event_form_on_off'
                iterValues={this.state.repeatDays}
                defaultValue="Never"
                onClick={this.displayOptions}
              />
              {this.toggleHiddenElement(
                this.state.hiddenRepeat,
                <OptionsInputForm
                  dayIndex={this.dayDict}
                  classesCss={'options_container'}
                  onClick={this.displayOptions}
                  repeat={this.state.repeat}
                  onClickDay={this.handleClickDayRepeat}
                  onClickDate={this.displayCalendarRepeat}
                  lastDayRepeat={this.state.lastDayRepeat}
                  />
              )}


              <span style={{alignSelf: "start",
                            marginTop: "5px"}}> tags: </span>
              <div className="event_form_values_container">
                  {this.getEventTagDivs(this.state.eventTags)}
                  <OnOffInputContainer
                    on_component_value={this.state.date}
                    on_component_save={this.setDate}
                    on_component={TagTool}
                    value_to_summary={dateToWritenDate}
                    off_component={SimpleInputOffState}
                    container_style='event_form_big_input grey_tag event_form_on_off'
                    on_container_additional_style="white_tag"
                    on_component_props={{classesCss: "event_form_tag_tool",
                                         user_tags: this.props.user_tags,
                                         event_tags: this.state.eventTags,
                                         add_tag_to_event_callback: this.addEventTag}}
                  />
                {this.toggleHiddenElement(
                        this.state.hiddenTagTool,
                        <TagTool
                            classesCss='event_form_tag_tool'
                            user_tags={this.props.user_tags}
                            event_tags={this.state.eventTags}
                            add_tag_to_event_callback={this.addEventTag}
                        />
                )}
                </div>

                <span> links: </span>
                <div className="event_form_values_container">
                    {this.getEventLinkDivs(this.state.eventLinks)}
                    <SelectInputForm
                      classesCss='input big_input div_input'
                      iterValues={[]}
                      defaultValue="+ Add link"
                      onClick={this.toggleLinkTool}
                    />
                  {this.toggleHiddenElement(
                          this.state.hiddenLinkTool,
                          <LinkTool
                              classesCss='event_form_tag_tool'
                              add_link_to_event_callback={this.addEventLink}
                              close_callback={this.toggleLinkTool}
                          />
                  )}
                </div>






              {this.toggleHiddenElement(
                this.state.hiddenCalendarRepeat,
                <MyCalendar
                  value={this.state.lastDayRepeatDate}
                  onChange={this.onChangeCalendarRepeat}
                  minDate={this.state.minDateRepeat}
                  classesCss={"calendar_container_repeat"}
                />
              )}

          </div>
    )
  }
  }
