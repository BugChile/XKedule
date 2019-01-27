import React from "react"

export default class MonthlyCard extends React.Component {


    generateDayCells(){
        var day_cells = [];
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        var day_info = null;
        for (var i = 0; i < 42; i++) {
            if (i < 7) {
                day_info = <div className="day_cell_info">
                                <div className="day_cell_name">
                                    {days[i]}
                                </div>
                                <div className="day_cell_number">
                                                {i}
                                </div>
                            </div>
            } else {
                day_info =  <div className="day_cell_info">
                                <div className="day_cell_number">
                                    {i}
                                </div>
                            </div>
            }

            day_cells[i] = <div className="day_cell_monthly" key={i}>
                               {day_info}
                               <div className="day_cell_task_container">
                                   <div className="task_card monthly_task_card">
                                        <div className="monthly_task_text">
                                            Universidad
                                        </div>
                                   </div>
                                   <div className="task_card monthly_task_card">
                                        <div className="monthly_task_text">
                                            Universidad
                                        </div>
                                   </div>
                               </div>
                           </div>
        }
        return day_cells;
    }


    render() {
        return(
            <div className="content_card">
            <div className="content_header">
                <div id="this_is_you_line" className="text_15">
                    this is <strong>your</strong> month
                </div>
                <div className="text_bold_title">
                    January
                </div>
                <div className="text_30">
                    2019
                </div>
            </div>
            <div className="content">
                 <div className="monthly_schedule">
                     {this.generateDayCells()}

                 </div>
            </div>
            </div>
        )
    }
  }
