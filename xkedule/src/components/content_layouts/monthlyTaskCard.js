import React from "react"



export default class MonthlyTaskCard extends React.Component {
    render() {
        const card_id = this.props.event.id.concat("_event_monthly_card")
        var className = "task_card monthly_task_card"
        if (this.props.className) {
            className += " "+this.props.className;
        }
        return(
            <a className={className}
                key={card_id}
                id={card_id}
                onClick={()=> this.props.clickEvent(this.props.event,
                                                    card_id)}>
                <div className="task_title">
                    {this.props.event.title}

                </div>
            </a>
    )
    }
}
