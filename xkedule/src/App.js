/*global chrome*/

import React, { Component } from 'react';
import { RRule } from "rrule";
import { connect } from 'react-redux';

import DailyCard from './components/content_layouts/dailyCard'
import MonthlyCard from './components/content_layouts/monthlyCard'
import WeeklyCard from './components/content_layouts/weeklyCard'
import MainButton from './components/mainButton'
import SwitchWeekMonth from './components/switchWeekMonth'
import InfoCard from './components/content_layouts/infoCard'
import CreationContainer from './components/creation_tools/creationContainer'
import { toDataDate }  from './js_helpers/parsers';
import { getRepeatsString }  from './js_helpers/rrule_helpers';
import { setEventsWithRepeat } from './store/actions'
import './App.css';
// development

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
            aux_view_time: new Date(),
            current_time: new Date(),
            loading: true,
            linkComponent:null,
            main_button_function: null,
            main_button_icon: "expand",
            refresh_aux: null,
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
        this.tick_current_time = this.tick_current_time.bind(this);
        this.hashEvents = this.hashEvents.bind(this);
        this.getEventSaveForm = this.getEventSaveForm.bind(this);
        this.onClickReturn = this.onClickReturn.bind(this);

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
        this.saveNewEvent = this.saveNewEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.saveNewTag = this.saveNewTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.changeTagUsage = this.changeTagUsage.bind(this);
        this.linkEvent = this.linkEvent.bind(this);
        this.clickEventDate = this.clickEventDate.bind(this);
        this.onClickDay = this.onClickDay.bind(this);
        // this.onClickAnywhereEvent = this.onClickAnywhereEvent.bind(this);

        //LIFE CYCLE

    };

    //STATE SETTERS

    changeMode(mode){
        this.setState({mode})
    }

    setEvents(events){
        const { parsedEvents, eventsWithRepeat } = this.parseLoadedEvents(events);
        const { setEventsWithRepeat } = this.props;
        setEventsWithRepeat(eventsWithRepeat);
        this.setState({ events: parsedEvents })
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
        let eventsWithRepeat = [];
        const parsedEvents = { ...events }
        let ruleObject;
        for (var key in parsedEvents) {
            if (parsedEvents[key].rrule !== undefined) {
                if (parsedEvents[key].rrule === 'Never'){
                    parsedEvents[key].rrule = "RRULE:FREQ=DAILY;INTERVAL=1";
                }
                ruleObject = RRule.fromString(parsedEvents[key].rrule)
                eventsWithRepeat = [...eventsWithRepeat, { 
                    id: parsedEvents[key].id,
                    ruleObject,
                 }]
            }
            parsedEvents[key].date_start = new Date(parsedEvents[key].date_start)
            parsedEvents[key].date_end = new Date(parsedEvents[key].date_end)
        }
        return { parsedEvents, eventsWithRepeat };
    }

    hashEvents(events){
        var hashed = {};
        var hashed_date = "";
        for (var key in events) {
            hashed_date = events[key].date_start.toLocaleDateString();
            if (hashed_date in hashed) {
                hashed[hashed_date].push(events[key].id)
            } else {
                hashed[hashed_date] = [events[key].id]
            }
        }
        return hashed;
    }

    tick(){
        var date = new Date(this.state.aux_view_time);
        date.setSeconds(this.state.aux_view_time.getSeconds() + 1);
        this.setState({aux_view_time: date});
    }
    tick_current_time(){
        var date = new Date(this.state.current_time);
        date.setSeconds(this.state.current_time.getSeconds() + 1);
        this.setState({current_time: date});
    }

    getEventSaveForm(date_start, date_end){
        return {
            title: this.new_event_object.title,
            description: this.new_event_object.description,
            rrule: getRepeatsString(this.new_event_object.rrule),
            links: this.new_event_object.links,
            tag_ids: this.new_event_object.tag_ids,
            date_start,
            date_end,
        }
    }


    //HTML HANDLERS

    changeHTMLProperty(id, property, color){
        document.getElementById(id).style[property] = color;
    }

    setSwitchWeekMonth(mode){
        if (mode === "weekly") {
            this.changeHTMLProperty("switch_to_week", "color", "#FFFFFF")
            this.changeHTMLProperty("switch_to_month", "color", "#333333")
            this.changeHTMLProperty("switch_week_month_button", "left", "0px")
        } else if (mode === "monthly") {
            this.changeHTMLProperty("switch_to_week", "color", "#333333")
            this.changeHTMLProperty("switch_to_month", "color", "#FFFFFF")
            this.changeHTMLProperty("switch_week_month_button", "left", "70px")
        }

    }

    listenScrollEvent(){
        this.setState({dailyComponentScroll:document.getElementById('content').scrollTop});
    }
    clickEventDate(length, type){

        var aux_bool = true;
        if (this.state.refresh_aux){
            aux_bool = null;
        }
        var date = this.state.aux_view_time;
        if (type === 'prev'){
            switch (length){
                case 2:
                    date.setDate(this.state.aux_view_time.getDate() - 1);
                    break;
                case 4:
                    date.setDate(this.state.aux_view_time.getDate() - 7);
                    break;
                case 5: 
                    date.setDate(this.state.aux_view_time.getDate() - 7);
                    break;
                case 1:
                    date.setMonth(this.state.aux_view_time.getMonth() - 1);
                    break;
                default:
                    break;
                }
        }else{
                switch (length){
                    case 2:
                        date.setDate(this.state.aux_view_time.getDate() + 1);
                        break;
                    case 4:
                        date.setDate(this.state.aux_view_time.getDate() + 7);
                        break;
                    case 5:
                        date.setDate(this.state.aux_view_time.getDate() + 7);
                        break;
                        case 1:
                            date.setMonth(this.state.aux_view_time.getMonth() + 1);
                            break;
                    default:
                        break;
                }
        }
        this.setState({aux_view_time: date, refresh_aux:aux_bool});

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
            default:
                break;

       }
       left += "px"
       top += "px"
       this.setState({infoDaily:event,
                      classesInfoCard:'event_info_card '.concat(this.state.mode),
                      eventInfoCardLeft:left,
                      eventInfoCardTop:top,
                      linkComponent:null})
    }
    onClickDay(day){
        this.setState({aux_view_time:day, mode:"daily"})
        this.closeEventForm();
        this.expand();
    }
    linkEvent(){
        (this.state.linkComponent)? this.setState({linkComponent:null}): this.setState({linkComponent:true});
    }

    closeEvent(){
        this.setState({infoDaily:null, classesInfoCard:'hidden event_info_card', InfoCardLinks:null})
        const content_div = document.getElementById("content")
        if (content_div) {
            content_div.style["overflow-y"] = "scroll";
        }
    }
    onClickReturn(){
        var aux_bool = true;
        if (this.state.refresh_aux){
            aux_bool = null;
        }
        this.setState({aux_view_time: this.state.current_time, refresh_aux:aux_bool})
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
        document.getElementById("main_button_container").classList.add("main_button_container_expanded_width");
        document.getElementById("content_container").style.width = "80%";
        document.getElementById("content_container").style.left = "0px";
        document.getElementById("creation_container").style.width = "80%";
    }

    shrinkContentContainer(){
        document.getElementById("main_button_container").classList.remove("reversed");
        document.getElementById("main_button_container").classList.remove("main_button_container_expanded_width");
        document.getElementById("content_container").style.width = "35%";
        document.getElementById("content_container").style.left = "0px";
        document.getElementById("creation_container").style.width = "35%";

    }

    showSmallCreationCard(){
        document.getElementById("main_button_container").classList.add("full_loop");
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").classList.add("creation_container_new_width");
            document.getElementById("creation_container").style.width = `calc(35% + 415px)`;
            document.getElementById("main_button_container").classList.add("main_button_container_new_width");
        } else {
            document.getElementById("content_container").style.left = "calc(-415px)";
        }
    }

    hideSmallCreationCard(){
        document.getElementById("main_button_container").classList.remove("full_loop");
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").classList.remove("creation_container_new_width");
            document.getElementById("creation_container").style.width = "35%";
            // document.getElementById("main_button_container").style.left = "calc(35% - 50px)";
            document.getElementById("main_button_container").classList.remove("main_button_container_new_width");
        } else {
            document.getElementById("content_container").style.left = "0px";
        }
    }

    showLargeCreationCard(){
        document.getElementById("main_button_container").classList.add("full_loop");
        this.setMainButtonIcon("save")
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "80%";
            document.getElementById("main_button_container").style.left = "calc(80% - 50px)";
            document.getElementById("content_container").style.left = "calc(-415px)";
        } else {
            document.getElementById("content_container").style.left = "calc(-415px)";
        }
    }

    hideLargeCreationCard(){
        document.getElementById("main_button_container").classList.remove("full_loop");
        this.setMainButtonIcon("expand")
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "35%";
            document.getElementById("main_button_container").style.left = "calc(35% - 50px)";
            document.getElementById("content_container").style.left = "0px";
        } else {
            document.getElementById("content_container").style.left = "0px";
        }
    }

    switchCard(mode, events, hashed_by_date){
        switch (mode) {
            case "daily":
            return <DailyCard events={events}
                              hashed_events={hashed_by_date}
                              scrollEvent={this.listenScrollEvent}
                              scrollDailyEvent={this.scrollDailyEvent}
                              clickEvent={this.clickEvent}
                              onClickReturn={this.onClickReturn}
                              aux_view_time={this.state.aux_view_time}
                              current_time={this.state.current_time}
                              key={this.state.refresh_aux}
                              clickEventDate={this.clickEventDate}/>;
            case "weekly":
                return <WeeklyCard events={events}
                                   hashed_events={hashed_by_date}
                                   onClickReturn={this.onClickReturn}
                                   aux_view_time={this.state.aux_view_time}
                                   current_time={this.state.current_time}
                                   clickEvent={this.clickEvent}
                                   key={this.state.refresh_aux}
                                   onClickDay = {this.onClickDay}
                                   clickEventDate={this.clickEventDate}/>;
            case "monthly":
                return <MonthlyCard events={events}
                                    hashed_events={hashed_by_date}
                                    onClickReturn={this.onClickReturn}
                                    aux_view_time={this.state.aux_view_time}
                                    current_time={this.state.current_time}
                                    clickEvent={this.clickEvent}
                                    key={this.state.refresh_aux}
                                    clickEventDate={this.clickEventDate}
                                    onClickDay={this.onClickDay}/>;
            default:
                return <DailyCard events={events}
                                  hashed_events={hashed_by_date}
                                  onClickReturn={this.onClickReturn}
                                  aux_view_time={this.state.aux_view_time}
                                  current_time={this.state.current_time}
                                  scrollEvent={this.listenScrollEvent}
                                  scrollDailyEvent={this.scrollDailyEvent}
                                  clickEvent={this.clickEvent}
                                  key={this.state.refresh_aux}
                                  clickEventDate={this.clickEventDate}/>;
        }
    }

    generateComponents(mode, creation_mode, editing_event_id, events, hashed_by_date, user_tags){
        var components = [];

        // Main card:
        var content_container_components = []
        content_container_components.push(this.switchCard(this.state.mode, events, hashed_by_date))

        // Switch button for week and month
        if (mode !== "daily") {
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
            <CreationContainer 
                creation_mode = {creation_mode}
                key={'creation_container'}
                events = {events}
                user_tags = {user_tags}
                editing_event_id = {editing_event_id}
                close_event_form = {this.closeEventForm}
                current_time={this.state.current_time}
                set_new_event_callback={this.setNewEventObject}
                save_tag_callback={this.saveNewTag}
                delete_tag_callback={this.deleteTag}
                aux_view_time={this.state.aux_view_time}
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
        if (this.state.mode === "daily") {
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
        if (this.state.mode === "monthly") {
            this.changeMode("weekly");
            this.setSwitchWeekMonth("weekly")
        } else if (this.state.mode === "weekly"){
            this.changeMode("monthly");
            this.setSwitchWeekMonth("monthly")
        }
        this.closeEvent();
    }

    createEvent(){
        if (this.state.creation_mode === "create_event" || this.state.creation_mode === "edit_event"){
            return this.closeEventForm();
        }
        document.getElementById("create_event_button").classList.add("cancel");
        this.setState({creation_mode: "create_event", editing_event_id: null});
        this.setMainButtonIcon("save");
        this.setMainButtonFunction(this.saveNewEvent);
        this.showSmallCreationCard();

    }

    editEvent(event){
        this.setState({creation_mode: "edit_event", editing_event_id: event.id});
        document.getElementById("create_event_button").classList.add("cancel");
        this.setMainButtonIcon("save");
        this.setMainButtonFunction(this.updateEvent);
        this.showSmallCreationCard();
    }

    closeEventForm(){
        document.getElementById("create_event_button").classList.remove("cancel");
        this.setState({creation_mode: "idle", editing_event_id: null});
        this.setMainButtonIcon("expand")
        this.setMainButtonFunction(this.expand);
        this.hideSmallCreationCard();
    }

    saveNewEvent(){
        // do data check here
        // this is necessary, for some reason without this date_start gets set to date_end
        const new_event_object = this.new_event_object;
        const date_start = toDataDate(new_event_object.date, new_event_object.date_start);
        const date_end = toDataDate(new_event_object.date, new_event_object.date_end);

        var to_save = this.getEventSaveForm(date_start, date_end);
        const id = this.props.save_callback("events",
                                        to_save,
                                       this.props.uid);
        // change tag usage
        new_event_object.tag_ids.forEach((tag_id) => {
            this.changeTagUsage(this.state.user_tags[tag_id], "increase");
        });
        // check if save event is successful

        // for some reason, it's necessary to set dates manually, if not date
        // and date_start get set to date_end
        var to_add = {...new_event_object, ...{id,
                                               date: new Date(date_start),
                                               date_start: new Date(date_start),
                                               date_end: new Date(date_end)}};
        var to_update_events = this.state.events;
        to_update_events[id] = to_add

        var { hashed_by_date } = this.state;
        const hashed_date = to_add.date_start.toLocaleDateString();
        if (hashed_date in hashed_by_date) {
            hashed_by_date[hashed_date].push(id)
        } else {
            hashed_by_date[hashed_date] = [id]
        }
        console.log(hashed_by_date);



        this.setState({events: to_update_events, hashed_by_date});
        this.closeEventForm();
        // add confirmation
        return id;
    }

    updateEvent(){
        // do data check here

        const previous_date = this.new_event_object.date_start;
        // this is necessary, for some reason without this date_start gets set to date_end
        const date_start = toDataDate(this.new_event_object.date, this.new_event_object.date_start);
        const date_end = toDataDate(this.new_event_object.date, this.new_event_object.date_end);


        const to_save = this.getEventSaveForm(date_start, date_end);
        const id = this.props.update_callback("events",
                                                    to_save,
                                                    this.props.uid,
                                                    this.state.editing_event_id);
        // change tag usage
        // new ones
        const additions = this.new_event_object.tag_ids.filter(
                    tag_id  => this.state.events[this.state.editing_event_id].tag_ids.indexOf(tag_id) === -1);
        additions.forEach((tag_id) => {
            this.changeTagUsage(this.state.user_tags[tag_id], "increase");
        });
        // deleted ones
        const deletions = this.state.events[this.state.editing_event_id].tag_ids.filter(
                    tag_id  => this.new_event_object.tag_ids.indexOf(tag_id) === -1);
        deletions.forEach((tag_id) => {
            this.changeTagUsage(this.state.user_tags[tag_id], "decrease");
        });
        // check if save event is successful
        // for some reason, it's necessary to set dates manually, if not date
        // and date_start get set to date_end
        const to_add = {...this.new_event_object, ...{id,
                                                      date: new Date(date_start),
                                                      date_start: new Date(date_start),
                                                      date_end: new Date(date_end)}};

        var to_update_events = Object.assign({}, this.state.events);
        to_update_events[id] = to_add;
        var hashed_by_date = Object.assign({}, this.state.hashed_by_date);
        const previous_hashed_date = previous_date.toLocaleDateString();
        const hashed_date = to_add.date_start.toLocaleDateString();
        var index = 0;
        hashed_by_date[previous_hashed_date].forEach((hashed_id) => {
            if (hashed_id === id) {
                hashed_by_date[previous_hashed_date].splice(index, 1);
            }
            index += 1;
        });
        if (hashed_date in hashed_by_date) {
            hashed_by_date[hashed_date].push(id)
        } else {
            hashed_by_date[hashed_date] = [id]
        }

        this.setState({events: to_update_events, hashed_by_date});
        this.closeEventForm();
        // add confirmation
        return id;
    }

    deleteEvent(to_delete_event){
        this.props.delete_callback("events", this.props.uid, to_delete_event.id);
        // change tag usage

        // aca esta el bug
        this.new_event_object.tag_ids.forEach((tag_id) => {
            this.changeTagUsage(this.state.user_tags[tag_id], "decrease");
        });
        // add confirmation

        //then
        var hashed_by_date = Object.assign({}, this.state.hashed_by_date);
        const hashed_date = to_delete_event.date_start.toLocaleDateString();
        var index = 0;
        hashed_by_date[hashed_date].forEach((hashed_id) => {
            if (hashed_id === to_delete_event.id) {
                hashed_by_date[hashed_date].splice(index, 1);
            }
            index += 1;
        });
        this.setState({hashed_by_date});
        this.closeEvent();
        return to_delete_event.id;
    }

    saveNewTag(tag){
        const tag_id = this.props.save_callback("tags", tag, this.props.uid);

        // add confirmation;

        var to_update_user_tags = Object.assign({}, this.state.user_tags);
        to_update_user_tags[tag_id] = tag;
        this.setState({user_tags: to_update_user_tags});
        return tag_id;
    }

    deleteTag(tag){
        this.props.delete_callback("tags", this.props.uid, tag.id);

        // add confirmation;

        var to_update_user_tags = Object.assign({}, this.state.user_tags);
        delete to_update_user_tags[tag.id];
        this.setState({user_tags: to_update_user_tags});
        return tag.id;
    }

    changeTagUsage(tag, mode){ // increases/decreases actual uses by one
        if (mode === "increase") {
            tag.actual_uses += 1;
        } else {
            tag.actual_uses -= 1;
        }
        const tag_id = this.props.update_callback("tags", tag, this.props.uid, tag.id);

        // add confirmation;

        var to_update_user_tags = Object.assign({}, this.state.user_tags);
        to_update_user_tags[tag_id] = tag;
        this.setState({user_tags: to_update_user_tags});
        return tag_id;
    }



    //LIFE CICLE

    componentDidMount(){
        // this.scrollDailyEvent();
        this.setUserTags(this.props.tags);
        this.setEvents(this.props.events);
        this.setHashedEvents(this.props.events);
        this.intervalID = setInterval(
            () => this.tick(this),
            1000
        );
        this.intervalIDAUX = setInterval(
            () => this.tick_current_time(this),
            1000
        );
        this.setMainButtonFunction(this.expand)
        this.setState({loading: false})
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
        clearInterval(this.intervalIDAUX);
    }

    render() {
        return(
            this.state.loading ? 
            <div className="charging_events"> 
                Please wait to get your information..
                <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                </div> 
            </div>
            :
            <div>
                {this.generateComponents(this.state.mode,
                                         this.state.creation_mode,
                                         this.state.editing_event_id,
                                         this.state.events,
                                         this.state.hashed_by_date,
                                         this.state.user_tags)}
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
                functionDelete={this.deleteEvent}
                functionEdit={this.editEvent}
                functionLink={this.linkEvent}
                left={this.state.eventInfoCardLeft}
                top={this.state.eventInfoCardTop}
                links={this.state.linkComponent}/>}

            </div>

        )
    }


}

const mapStateToProps = (state) => ({
    eventsWithRepeat: state.eventsWithRepeat,
});





export default connect(mapStateToProps, { setEventsWithRepeat })(App);
