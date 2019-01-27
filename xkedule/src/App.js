import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DailyCard from './components/dailyCard'
import MonthlyCard from './components/monthlyCard'
import WeeklyCard from './components/weeklyCard'
import ExpandButton from './components/expandButton'
import SwitchWeekMonth from './components/switchWeekMonth'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            mode: "daily",
        }

        //STATE SETTERS
        this.changeMode = this.changeMode.bind(this)

        //HTML HANDLERS
        this.changeHTMLProperty = this.changeHTMLProperty.bind(this);
        this.setSwitchWeekMonth = this.setSwitchWeekMonth.bind(this);
        this.expandContentContainer = this.expandContentContainer.bind(this);
        this.shrinkContentContainer = this.shrinkContentContainer.bind(this);
        this.switchCard = this.switchCard.bind(this);
        this.generateComponents = this.generateComponents.bind(this);

        //CALLBACKS
        this.expand = this.expand.bind(this);
        this.switchWeekMonth = this.switchWeekMonth.bind(this);

    };

    //STATE SETTERS

    changeMode(mode){
        this.setState({mode})
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

    expandContentContainer(){
        document.getElementById("expand").classList.add("reversed_expand");
        document.getElementById("content_container").classList.add("large_content_container");
    }

    shrinkContentContainer(){
        document.getElementById("expand").classList.remove("reversed_expand");
        document.getElementById("content_container").classList.remove("large_content_container");
    }

    switchCard(mode){
        switch (mode) {
            case "daily":
                return <DailyCard />;
                break;
            case "weekly":
                return <WeeklyCard />;
                break;
            case "monthly":
                return <MonthlyCard />;
                break;
            default:
                return <DailyCard />;
                break;

        }
    }

    generateComponents(mode){
        var components = [];

        components.push(<ExpandButton expandCB={this.expand} key="expand_button"/>);

        var content_container_components = []
        content_container_components.push(this.switchCard(this.state.mode))
        if (mode != "daily") {
            content_container_components.push(<SwitchWeekMonth key="switch_week_month"
                                             switchWeekMonthCB={this.switchWeekMonth}/>)
        }
        components.push(
            <div id = "content_container" className="content_container" key="content_container">
                {content_container_components}
            </div>
        )


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

    render() {
        return(
            <div>
            {this.generateComponents(this.state.mode)}
            </div>

        )
    }


}





export default App;
