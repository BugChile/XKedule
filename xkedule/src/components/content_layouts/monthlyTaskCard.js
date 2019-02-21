import React from "react"


  
export default class MonthlyTaskCard extends React.Component {
    render() {
        return(
            <a className="task_card monthly_task_card"
                key={this.props.event.id}
                onClick={()=> this.props.clickEvent(this.props.event, 'position_'.concat(this.props.event.date_start.getDay()), 'possible_top_class')}>
                <div className="task_title">
                    {this.props.event.title}
                    
                </div>
            </a>
    )
    }
}
