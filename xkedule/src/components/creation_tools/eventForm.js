import React from "react"
import InputForm from "./inputForm";
import EventTag from "./eventTag"
import TimeInputForm from "./timeInputForm";
import SelectInputForm from "./selectInputForm";
import OptionsInputForm from "./optionsRepeatInput";
import MyCalendar from "./myCalendar";
import Calendar from 'react-calendar';

export default class EventForm extends React.PureComponent {
  constructor(props){
      super(props)
      this.dayDict = { "Mo":0, "Tu":1, "We":2, "Th":3, "Fr":4, "Sa":5, "Su":6 };
      this.dayWeekDict = { 1:"Mo", 2:"Tu", 3:"We", 4:"Th", 5:"Fr", 6:"Sa", 0:"Su" };
      this.dictReversed = {1:0, 0:1};
      this.state = {
          title: "",
          date:[0],
          from:"",
          to:"",
          minTo:"00:00",
          today: new Date(),
          minDateRepeat: new Date(),
          isDisabled:true,
          repeat:[0,0,0,0,0,0,0],
          repeatDays:[0,0,0,0,0,0,0],
          fromDayDate: new Date(),
          lastDayRepeatDate: new Date(),
          lastDayRepeat: [0],
          hiddenCalendarEvent: "hidden",
          hiddenCalendarRepeat: "hidden",
          add_tag:"",
          tags: [
              {"name": "IIC2233 - Inteligencia Artificial", "style": "ocean_tag"},
              {"name": "Gym", "style": "lilac_tag"}
          ],
          hiddenRepeat:"hidden",
      };
      this.setValue = this.setValue.bind(this);
      this.checkTime = this.checkTime.bind(this);
      this.displayOptions = this.displayOptions.bind(this);
      this.handleClickDayRepeat = this.handleClickDayRepeat.bind(this);
      this.displayCalendar = this.displayCalendar.bind(this);
      this.displayCalendarRepeat = this.displayCalendarRepeat.bind(this);
      this.onChangeCalendar = this.onChangeCalendar.bind(this);
      this.onChangeCalendarRepeat = this.onChangeCalendarRepeat.bind(this);
      this.toggleHiddenElement = this.toggleHiddenElement.bind(this);
      this.getTags = this.getTags.bind(this);

  };

  setValue(event, target){
      if(target ==="title"){
        this.setState({title: event.target.value})
      }else if(target ==="from"){
            this.setState({from: event.target.value, isDisabled:true, minTo:event.target.value, to:""})
        if (event.target.value){
        this.setState({from: event.target.value, isDisabled:false, minTo:event.target.value})
        }
      }else if(target ==="to"){
        this.setState({to: event.target.value})

      }else{
        this.setState({add_tag: event.target.value})
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

  getTags(tags){
      var tag_divs = [];
      tags.forEach((tag) => {
          tag_divs.push(<EventTag  classesCss={`event_form_tag ${tag.style}`}
                     tag_name={tag.name}/>
                 );
      })
      return tag_divs;
  }

  render() {
      return(
          <div id = "event_form" className="event_form" key="event_form">
              <span> Title: </span>
              <InputForm
                classesCss='input big_input'
                value={this.state.title}
                onChange={this.setValue}
                type="title"
              />

              <span> Date: </span>

              <SelectInputForm
                classesCss='input big_input div_input'
                iterValues={this.state.date}
                defaultValue="Select Date"
                onClick={this.displayCalendar}
              />

              <span> From: </span>
              <TimeInputForm
                min="00:00"
                isDisabled={false}
                classesCss='input small_input'
                value={this.state.from}
                onChange={this.setValue}
                type="from"
                functionCheck={()=>{}}
              />

              <span> To: </span>
              <TimeInputForm
                min={this.state.minTo}
                isDisabled={this.state.isDisabled}
                classesCss='input small_input'
                value={this.state.to}
                onChange={this.setValue}
                type="to"
                functionCheck={this.checkTime}
              />

              <span> Repeat: </span>

              <SelectInputForm
                classesCss='input big_input div_input'
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

              <span> Tags: </span>
              <div className="event_form_tag_container">
                  {this.getTags(this.state.tags)}

                  <InputForm classesCss='input big_input'
                             value={this.state.add_tag}
                             placeholder="+ Add tag"
                             onChange={this.setValue}
                             type="add_tag"/>
              </div>




              {this.toggleHiddenElement(
                this.state.hiddenCalendarEvent,
                <MyCalendar
                  value={this.state.fromDayDate}
                  onChange={this.onChangeCalendar}
                  minDate={this.state.today}
                  classesCss={"calendar_container"}
                />
              )}

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
