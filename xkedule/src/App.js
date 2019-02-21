import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DailyCard from './components/content_layouts/dailyCard'
import MonthlyCard from './components/content_layouts/monthlyCard'
import WeeklyCard from './components/content_layouts/weeklyCard'
import ExpandButton from './components/expandButton'
import SwitchWeekMonth from './components/switchWeekMonth'
import InfoCard from './components/content_layouts/infoCard'
import CreationContainer from './components/creation_tools/creationContainer'
import logo from './assets/logo.svg';
import './App.css';


// development

import { events }  from './js_helpers/dev_data';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            mode: "daily",
            creation_mode: "create_event",
            events: {},
            dailyComponentScroll: new Date().getHours() * 60 - 120,// cambiar después
            infoDaily: null,
            classesInfoCard:'hidden info_daily_task',
            infoDailyTop: null,
            hashed_by_date:{}, // hash events by date (number of milliseconds as in Date)
            current_time: new Date(),
            loading: true,
        }

        //STATE SETTERS
        this.changeMode = this.changeMode.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.setHashedEvents = this.setHashedEvents.bind(this);

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
        this.closeEvent = this.closeEvent.bind(this);
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

    setHashedEvents(events){
        this.setState({hashed_by_date: this.hashEvents(events)})
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

    clickEvent(event, type, top=null){
       this.setState({infoDaily:event, classesInfoCard:'info_daily_task '.concat(type), infoDailyTop:top})
    }
    
    closeEvent(){
        this.setState({infoDaily:null, classesInfoCard:'hidden info_daily_task'})
    }

    // onClickAnywhereEvent(event, data){
    //     alert(event.target.type);
    //     // this.setState({infoDaily:null, classesInfoCard:'hidden info_daily_task'})
    // }

    scrollDailyEvent(){
        document.getElementById('content').scrollTop = this.state.dailyComponentScroll;
    }

    expandContentContainer(){
        document.getElementById("expand").classList.add("reversed_expand");
        document.getElementById("expand").style.left = "1250px";
        document.getElementById("content_container").style.width = "1300px";
        document.getElementById("content_container").style.left = "0px";
        document.getElementById("creation_container").style.width = "1300px";
    }

    shrinkContentContainer(){
        document.getElementById("expand").classList.remove("reversed_expand");
        document.getElementById("expand").style.left = "550px";
        document.getElementById("content_container").style.width = "600px";
        document.getElementById("content_container").style.left = "0px";
        document.getElementById("creation_container").style.width = "600px";

    }

    showSmallCreationCard(){
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "1000px";
            document.getElementById("expand").style.left = "950px";
        } else {
            document.getElementById("content_container").style.left = "-400px";
        }
    }

    hideSmallCreationCard(){
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "600px";
            document.getElementById("expand").style.left = "550px";
        } else {
            document.getElementById("content_container").style.left = "0px";
        }
    }

    showLargeCreationCard(){
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "1300px";
            document.getElementById("expand").style.left = "1250px";
            document.getElementById("content_container").style.left = "-400px";
        } else {
            document.getElementById("content_container").style.left = "-1100px";
        }
    }

    hideLargeCreationCard(){
        if (this.state.mode === "daily") {
            document.getElementById("creation_container").style.width = "600px";
            document.getElementById("expand").style.left = "550px";
            document.getElementById("content_container").style.left = "0px";
        } else {
            document.getElementById("content_container").style.left = "0px";
        }
    }

    switchCard(mode){
        switch (mode) {
            case "daily":
            return <DailyCard events={this.state.hashed_by_date} scrollEvent={this.listenScrollEvent} scrollDailyEvent={this.scrollDailyEvent} clickEvent={this.clickEvent} current_time={this.state.current_time}/>;
            case "weekly":
                return <WeeklyCard events={this.state.hashed_by_date} current_time={this.state.current_time} clickEvent={this.clickEvent}/>;
            case "monthly":
                return <MonthlyCard events={this.state.hashed_by_date} current_time={this.state.current_time} clickEvent={this.clickEvent}/>;
            default:
                return <DailyCard events={this.state.hashed_by_date} current_time={this.state.current_time} scrollEvent={this.listenScrollEvent} scrollDailyEvent={this.scrollDailyEvent} clickEvent={this.clickEvent}/>;
        }
    }

    generateComponents(mode, creation_mode){
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
                <CreationContainer creation_mode = {creation_mode}/>
            )

        // Expand/Accept button:
        components.push(<ExpandButton expandCB={this.expand} key="expand_button"/>);



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
    }

    switchWeekMonth(){
        if (this.state.mode == "monthly") {
            this.changeMode("weekly");
            this.setSwitchWeekMonth("weekly")
        } else if (this.state.mode == "weekly"){
            this.changeMode("monthly");
            this.setSwitchWeekMonth("monthly")

        }
    }

    //LIFE CICLE

    componentDidMount(){
        // this.scrollDailyEvent();
        this.setEvents(events);
        this.setHashedEvents(events);
        this.intervalID = setInterval(
            () => this.tick(this),
            1000
        );
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
                {this.generateComponents(this.state.mode, this.state.creation_mode)}
               
                <div className="placeholder_button" onClick={this.showSmallCreationCard}>
                 1
                </div>
                <div className="placeholder_button" onClick={this.hideSmallCreationCard} style={{top: "150px"}}>
                 2
                </div>
                {<InfoCard 
                classesInfoCard={this.state.classesInfoCard} 
                event={this.state.infoDaily} 
                topValue={this.state.infoDailyTop} 
                functionClose={this.closeEvent}/>}
            </div>

        )
    }


}





export default App;
