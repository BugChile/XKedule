import React from "react"

export default class MonthlyCardCell extends React.Component {

  render() {
      return(
          <div className={this.props.cell_class_list} key={this.props.cell_key}>
                   <div className="day_cell_info">
                       {this.props.day_info}
                   </div>
               <div className="day_cell_task_container">
                   {this.props.day_tasks}
               </div>
           </div>
    )
  }
  }
