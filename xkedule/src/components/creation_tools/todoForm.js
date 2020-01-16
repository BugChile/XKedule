import React, { Component } from 'react';
import OnOffInputContainer from '../input_components/onOffInputContainer';
import TextLineInput from '../input_components/textLineInput';
import Calendar from 'react-calendar';
import SimpleInputOffState from '../input_components/simpleInputOffState';
import HourMinuteInput from '../input_components/hourMinuteInput';

import { dateToWrittenDate, dateToHourMinute } from '../../js_helpers/parsers';

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date_limit: new Date(),
      time_limit: new Date(),
      todoTags: {},
      active_date: false
    };
    this.setTitle = this.setTitle.bind(this);
    this.setDateLimit = this.setDateLimit.bind(this);
    this.setTimeLimit = this.setTimeLimit.bind(this);
    this.setTimeLimitHourMinute = this.setTimeLimitHourMinute.bind(this);
  }

  setTitle(title) {
    this.setState({ title });
  }
  setTimeLimit(time_limit) {
    this.setState({ time_limit });
  }
  setDateLimit(date_limit) {
    this.setState({ date_limit, active_date: true });
  }

  setTimeLimitHourMinute(time_limit_hour_minute) {
    // format: {hour: H, minute: m}, H and m are integers
    var date_time_limit = new Date(this.state.time_limit.getTime());
    date_time_limit.setHours(time_limit_hour_minute.hour);
    date_time_limit.setMinutes(time_limit_hour_minute.minute);
    this.setTimeLimit(date_time_limit);
  }
  render() {
    return (
      <div
        className={[
          'todo_create_event',
          this.props.create_active ? 'todo_shown' : null
        ].join(' ')}
      >
        <div className='right_aligned_text'>
          <span
            id='event_form_discard'
            className='right_aligned_text'
            onClick={this.props.cancel}
          >
            Cancel
          </span>
        </div>

        <div className=''>
          <div id='event_form' className='event_form' key='event_form'>
            <div className='event_form_input_gap'></div>
            <span> title: </span>
            <TextLineInput
              value={this.state.title}
              onChange={this.setTitle}
              className='event_form_big_input blue_tag'
              enter_key_submit
            />

            <div className='event_form_input_gap'></div>
            <div></div>
            {this.state.active_date ? (
              <div
                className='diseable_date'
                onClick={() => {
                  this.setState({ active_date: false });
                }}
              >
                diseable date
              </div>
            ) : (
              <div
                className='diseable_date'
                onClick={() => {
                  this.setState({ active_date: true });
                }}
              >
                add date
              </div>
            )}
            {this.state.active_date ? (
              <div className='event_form_input_gap'></div>
            ) : null}
            {this.state.active_date ? <span> date: </span> : null}
            {this.state.active_date ? (
              <OnOffInputContainer
                on_component_value={this.state.date_limit}
                on_component_save={this.setDateLimit}
                on_component={Calendar}
                value_to_summary={dateToWrittenDate}
                off_component={SimpleInputOffState}
                container_style='event_form_big_input blue_tag event_form_on_off'
                on_component_props={{
                  minDate: new Date(),
                  className: 'input_calendar'
                }}
                submit_on_change
              />
            ) : null}

            {this.state.active_date ? (
              <div className='event_form_input_gap'></div>
            ) : null}
            {this.state.active_date ? <span> time: </span> : null}
            {this.state.active_date ? (
              <OnOffInputContainer
                on_component_value={this.state.time_limit}
                on_component_save={this.setTimeLimitHourMinute}
                on_component={HourMinuteInput}
                value_to_summary={dateToHourMinute}
                off_component={SimpleInputOffState}
                container_style='event_form_small_input blue_tag event_form_on_off'
              />
            ) : null}

            <div className='event_form_input_gap'></div>
            {/* 
            <span> tags: </span>
            {this.getEventTagDivs(this.state.eventTags)}
            <OnOffInputContainer
              on_component_value={this.state.eventTags}
              on_component_save={this.addEventTag}
              on_component={TagTool}
              off_component={SimpleInputOffState}
              container_style="event_form_big_input blue_tag event_form_on_off"
              on_component_props={{
                className: "tag_tool",
                user_tags: this.props.user_tags,
                onCreateNewTag: this.createAndAddNewTag,
                delete_tag_callback: this.props.delete_tag_callback
              }}
              off_text="+ Add tags"
            /> */}
          </div>
        </div>
        <div className='right_aligned_text'>
          <span
            id='event_form_discard'
            className='right_aligned_text'
            onClick={this.props.cancel}
          >
            <button
              className='todo_button_create'
              onClick={this.props.createEvent}
            >
              Create
            </button>
          </span>
        </div>
      </div>
    );
  }
}
