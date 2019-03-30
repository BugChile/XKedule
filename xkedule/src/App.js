/*global chrome*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DailyCard from './components/content_layouts/dailyCard'
import MonthlyCard from './components/content_layouts/monthlyCard'
import WeeklyCard from './components/content_layouts/weeklyCard'
import MainButton from './components/mainButton'
import SwitchWeekMonth from './components/switchWeekMonth'
import InfoCard from './components/content_layouts/infoCard'
import CreationContainer from './components/creation_tools/creationContainer'
import {save_event, load_event}  from './js_helpers/data_handling';
import logo from './assets/logo.svg';
import './App.css';


// development
import { events, user_tags }  from './js_helpers/dev_data';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            mode: "daily",
            creation_mode: "idle",
            editing_event_id: null, //id of the event that's being edited, if any, else null
            events: {},
            user_tags: {},
            dailyComponentScroll: new Date().getHours() * 60 - 120,// cambiar después
            infoDaily: null,
            classesInfoCard:'hidden event_info_card',
            infoDailyTop: null,
            eventInfoCardLeft: null,
            eventInfoCardTop:null,
            hashed_by_date:{}, // hash events by date (number of milliseconds as in Date)
            current_time: new Date(),
            loading: true,
            main_button_function: null,
            main_button_icon: "expand",
        }

        this.new_event_object = {};


        //STATE SETTERS
        this.changeMode = this.changeMode.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.setHashedEvents = this.setHashedEvents.bind(this);
        this.setUserTags = this.setUserTags.bind(this);
        this.setMainButtonIcon = this.setMainButtonIcon.bind(this);
        this.setMainButtonFunction = this.setMainButtonFunction.bind(this);
        this.setNewEventObject = this.setNewEventObject.bind(this);

        //CONTENT GENERATORS
        this.tick = this.tick.bind(this);
        this.hashEvents = this.hashEvents.bind(this);

        //HTML HANDLERS
        this.changeHTMLProperty = this.changeHTMLProperty.bind(this);
        this.setSwitchWeekMonth = this.setSwitchWeekMonth.bind(this);
        this.expandContentContainer = this.expandContentContainer.bind(this);
        this.shrinkContentContainer = this.shrinkContentContainer.bind(this);
        this.switchCard = this.switchCard.bind(this);
        this.generateComponents = this.generateComponents.bind(this);
        this.showSmallCreationCard = this.showSmallCreationCard.bind(this);
        this.hideSmallCreationCard = this.hideSmallCreationCard.bind(this);
        this.showLargeCreationCard = this.showLargeCreationCard.bind(this);
        this.hideLargeCreationCard = this.hideLargeCreationCard.bind(this);

        //CALLBACKS
        this.expand = this.expand.bind(this);
        this.switchWeekMonth = this.switchWeekMonth.bind(this);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
        this.scrollDailyEvent = this.scrollDailyEvent.bind(this);
        this.clickEvent = this.clickEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.closeEvent = this.closeEvent.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.closeEventForm = this.closeEventForm.bind(this);
        this.saveEvent = this.saveEvent.bind(this);
        // this.onClickAnywhereEvent = this.onClickAnywhereEvent.bind(this);

        //LIFE CYCLE

    };

    //STATE SETTERS

    changeMode(mode){
        this.setState({mode})
    }

    setEvents(events){
        this.setState({events: this.parseLoadedEvents(events)})
    }

    setUserTags(user_tags){
        this.setState({user_tags})
    }

    setHashedEvents(events){
        this.setState({hashed_by_date: this.hashEvents(events)})
    }

    setMainButtonFunction(main_button_function){
        this.setState({main_button_function})
    }

    setMainButtonIcon(main_button_icon){
        this.setState({main_button_icon})
    }

    setNewEventObject(key, value){
        this.new_event_object[key] = value;
    }

    //CONTENT GENERATORS
    parseLoadedEvents(events){
        for (var key in events) {
            events[key].date_start = new Date(events[key].date_start)
            events[key].date_end = new Date(events[key].date_end)
        }
        return events;
    }

    hashEvents(events){
        var hashed = {};
        var hashed_date = "";
        for (var key in events) {
            hashed_date = events[key].date_start.toLocaleDateString();
            if (hashed_date in hashed) {
                hashed[hashed_date].push(events[key])
            } else {
                hashed[hashed_date] = [events[key]]
            }
        }
        return hashed;
    }

    tick(){
        var date = new Date(this.state.current_time);
        date.setDate(this.state.current_time.getDate() + 1);
        this.setState({current_time: new Date()});
    }


    //HTML HANDLERS

    changeHTMLProperty(id, property, color){
        document.getElementById(id).style[property] = color;
    }

    setSwitchWeekMonth(mode){
        if (mode == "weekly") {
            this.changeHTMLProperty("switch_to_week", "color", "#FFFFFF")
            this.changeHTMLProperty("switch_to_month", "color", "#333333")
            this.changeHTMLProperty("switch_week_month_button", "left", "0px")
        } else if (mode == "monthly") {
            this.changeHTMLProperty("switch_to_week", "color", "#333333")
            this.changeHTMLProperty("switch_to_month", "color", "#FFFFFF")
            this.changeHTMLProperty("switch_week_month_button", "left", "70px")
        }

    }

    listenScrollEvent(){
        this.setState({dailyComponentScroll:document.getElementById('content').scrollTop});
    }

    clickEvent(event, card_id=null){
       const content_div = document.getElementById("content")
       if (content_div) {
           content_div.style["overflow-y"] = "hidden";
       }
       const eventCardCoordinates = document.getElementById(card_id).getBoundingClientRect();
       var left = 0;
       var top = 0;
       switch (this.state.mode) {
           case 'monthly':
               if (eventCardCoordinates.left <= 700 ) {
                   left = eventCardCoordinates.left + 175
               } else {
                   left = eventCardCoordinates.left - 415
               }
               top = Math.min(eventCardCoordinates.top, 460)
               break;
           case 'weekly':
               if (eventCardCoordinates.left <= 700 ) {
                   left = eventCardCoordinates.left + 170
               } else {
                   left = eventCardCoordinates.left - 415
               }
               top = Math.min(eventCardCoordinates.top, 460)
               break;
           case 'daily':
               left = eventCardCoordinates.left
               top = Math.min(eventCardCoordinates.top + eventCardCoordinates.height + 5)
               if (document.body.getBoundingClientRect().height - top < 250) {
                   top = eventCardCoordinates.top - 265;
               }

               break;

       }
       left += "px"
       top += "px"
       this.setState({infoDaily:event,
                      classesInfoCard:'event_info_card '.concat(this.state.mode),
                      eventInfoCardLeft:left,
                      eventInfoCardTop:top})
    }

    closeEvent(){
        this.setState({infoDaily:null, classesInfoCard:'hidden event_info_card'})
        const content_div = document.getElementById("content")
        if (content_div) {
            content_div.style["overflow-y"] = "scroll";
        }
    }

    // onClickAnywhereEvent(event, data){
    //     alert(event.target.type);
    //     // this.setState({infoDaily:null, classesInfoCard:'hidden event_info_card'})
    // }

    scrollDailyEvent(){
        document.getElementById('content').scrollTop = this.state.dailyComponentScroll;
    }

    expandContentContainer(){
        document.getElementById("main_button_container").classList.add("reversed");
        document.getElementById("main_button_container").style.left = "1250px";
        document.getElementById("content_container").style.width = "1300px";
        document.getElementById("content_container").style.left = "0px";
        document.getElementById("creation_container").style.width = "1300px";
    }

    shrinkContentContainer(){
        document.getElementById("main_button_container").classList.remove("reversed");
        document.getElementById("main_button_container").style.left = "550px";
        document.getElementById("content_container").style.width = "600px";
        document.getElementById("content_container").style.left = "0px";
        document.getElementById("creation_container").style.width = "600px";

    }

    showSmallCreationCard(){
        document.getElementById("main_button_container").classList.add("full_loop");
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "1000px";
            document.getElementById("main_button_container").style.left = "950px";
        } else {
            document.getElementById("content_container").style.left = "-400px";
        }
    }

    hideSmallCreationCard(){
        document.getElementById("main_button_container").classList.remove("full_loop");
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "600px";
            document.getElementById("main_button_container").style.left = "550px";
        } else {
            document.getElementById("content_container").style.left = "0px";
        }
    }

    showLargeCreationCard(){
        document.getElementById("main_button_container").classList.add("full_loop");
        this.setMainButtonIcon("save")
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "1300px";
            document.getElementById("main_button_container").style.left = "1250px";
            document.getElementById("content_container").style.left = "-400px";
        } else {
            document.getElementById("content_container").style.left = "-1100px";
        }
    }

    hideLargeCreationCard(){
        document.getElementById("main_button_container").classList.remove("full_loop");
        this.setMainButtonIcon("expand")
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "600px";
            document.getElementById("main_button_container").style.left = "550px";
            document.getElementById("content_container").style.left = "0px";
        } else {
            document.getElementById("content_container").style.left = "0px";
        }
    }

    switchCard(mode){
        switch (mode) {
            case "daily":
            return <DailyCard events={this.state.hashed_by_date}
                              scrollEvent={this.listenScrollEvent}
                              scrollDailyEvent={this.scrollDailyEvent}
                              clickEvent={this.editEvent}
                              current_time={this.state.current_time}/>;
            case "weekly":
                return <WeeklyCard events={this.state.hashed_by_date}
                                   current_time={this.state.current_time}
                                   clickEvent={this.editEvent}/>;
            case "monthly":
                return <MonthlyCard events={this.state.hashed_by_date}
                                    current_time={this.state.current_time}
                                    clickEvent={this.editEvent}/>;
            default:
                return <DailyCard events={this.state.hashed_by_date}
                                  current_time={this.state.current_time}
                                  scrollEvent={this.listenScrollEvent}
                                  scrollDailyEvent={this.scrollDailyEvent}
                                  clickEvent={this.editEvent}/>;
        }
    }

    generateComponents(mode, creation_mode, editing_event_id){
        var components = [];

        // Main card:
        var content_container_components = []
        content_container_components.push(this.switchCard(this.state.mode))

        // Switch button for week and month
        if (mode != "daily") {
            content_container_components.push(<SwitchWeekMonth key="switch_week_month"
                                             switchWeekMonthCB={this.switchWeekMonth}/>)
        }
        components.push(
            <div id = "content_container" className="content_container" key="content_container">
                {content_container_components}
            </div>
        )


        // Creating and editing content container:
        components.push(
            <CreationContainer creation_mode = {creation_mode}
                               events = {this.state.events}
                               user_tags = {this.state.user_tags}
                               editing_event_id = {editing_event_id}
                               close_event_form = {this.closeEventForm}
                               current_time={this.state.current_time}
                               set_new_event_callback={this.setNewEventObject}
                               />
        )

        // Expand/Accept button:
        components.push(<MainButton function={this.state.main_button_function}
                                    key="main_button"
                                    icon_mode={this.state.main_button_icon}/>);



        return components;


    }


    //CALLBACKS (should only call above functions)

    expand(){
        if (this.state.mode == "daily") {
            this.changeMode("weekly");
            this.expandContentContainer();
            this.switchWeekMonth();
        } else {
            this.changeMode("daily");
            this.shrinkContentContainer();
        }
        this.closeEvent();
    }

    switchWeekMonth(){
        if (this.state.mode == "monthly") {
            this.changeMode("weekly");
            this.setSwitchWeekMonth("weekly")
        } else if (this.state.mode == "weekly"){
            this.changeMode("monthly");
            this.setSwitchWeekMonth("monthly")
        }
        this.closeEvent();
    }

    createEvent(){
        this.setState({creation_mode: "create_event", editing_event_id: null});
        this.setMainButtonIcon("save");
        this.setMainButtonFunction(this.saveEvent);
        this.showSmallCreationCard();

    }

    editEvent(event){
        this.setState({creation_mode: "edit_event", editing_event_id: event.id});
        this.setMainButtonIcon("save");
        this.setMainButtonFunction(this.saveEvent);
        this.showSmallCreationCard();
    }

    closeEventForm(){
        this.setState({creation_mode: "idle", editing_event_id: null});
        this.setMainButtonIcon("expand")
        this.setMainButtonFunction(this.expand);
        this.hideSmallCreationCard();
    }

    saveEvent(){
        // do data check here
        save_event(this.new_event_object);
    }

    //LIFE CICLE

    componentDidMount(){
        // this.scrollDailyEvent();
        this.setUserTags(user_tags);
        this.setEvents(this.props.events);
        this.setHashedEvents(this.props.events);
        this.intervalID = setInterval(
            () => this.tick(this),
            1000
        );
        this.setMainButtonFunction(this.expand)
        this.setState({loading: false})
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return(
            this.state.loading ? <div> loading </div>
            :
            <div>
                {this.generateComponents(this.state.mode,
                                         this.state.creation_mode,
                                         this.state.editing_event_id)}
                <div id="create_event_button" onClick={this.createEvent}>
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19V1C19 0.447715 19.4477 0 20 0H25C25.5523 0 26 0.447715 26 1V19H44C44.5523 19 45 19.4477 45 20V25C45 25.5523 44.5523 26 44 26H26V44C26 44.5523 25.5523 45 25 45H20C19.4477 45 19 44.5523 19 44V26H1C0.447715 26 0 25.5523 0 25V20C0 19.4477 0.447715 19 1 19H19Z" fill="white"/>
                    </svg>
                </div>


                {<InfoCard
                classesInfoCard={this.state.classesInfoCard}
                event={this.state.infoDaily}
                topValue={this.state.infoDailyTop}
                functionClose={this.closeEvent}
                left={this.state.eventInfoCardLeft}
                top={this.state.eventInfoCardTop}/>}
            </div>

        )
    }


}





export default App;
