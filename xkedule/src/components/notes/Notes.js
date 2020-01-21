import React, { Component } from 'react';
import Plus from '../svgs/Plus';
import Ticket from '../svgs/Ticket';
import { clone } from '../../js_helpers/helpers';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create_active: false,
      notes: null,
    };
    this.createItemMode = this.createItemMode.bind(this);
  }

  onClose() {
    document.getElementById('notes_position').style.left = '-100vw';
    document.getElementById('notes_position').style.zIndex = '-1000';
    this.setState({ create_active: false });
  }
  open() {
    document.getElementById('notes_position').style.left = 60;
    document.getElementById('notes_position').style.zIndex = '1000';
  }

  createItemMode() {
    this.setState(prevState => ({
      create_active: !prevState.create_active,
    }));
  }

  componentDidMount() {
    const new_notes = clone(this.props.notes);
    console.log(new_notes);
    delete new_notes[3]['childs'][3]['childs'][2];
    console.log(this.props.notes);
    this.setState({ notes: new_notes });
  }

  UNSAFE_componentWillMount() {}

  render() {
    return (
      <div
        style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        className='notes_container'
      >
        <div className='title_tab'>
          Life is{' '}
          <span className='text_bold_title  color_text_notes'>short</span>. Do
          stuff that{' '}
          <span className='text_bold_title color_text_notes'>matter!</span>{' '}
        </div>
        <div className='container_info_tab'>
          <div
            style={{
              backgroundColor: '',
              width: '50%',
              height: 'calc(100vh - 230px)',
            }}
          >
            asd
          </div>
          <div
            style={{
              backgroundColor: '',
              width: '40%',
              height: 'calc(100vh - 230px)',
            }}
          >
            asd
          </div>

          <div
            className='main_button_container_notes reversed'
            onClick={() => {
              this.onClose();
              this.props.onClose('calendar');
            }}
          >
            <div className='main_button linear_grad'></div>
            <Ticket />
          </div>
          <div
            className={[
              'create_event_button_notes',
              this.state.create_active ? 'cancel' : null,
            ].join(' ')}
            onClick={this.createItemMode}
          >
            <Plus />
          </div>
        </div>
      </div>
    );
  }
}
