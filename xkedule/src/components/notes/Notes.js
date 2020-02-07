import React, { useState } from 'react';
import Ticket from '../svgs/Ticket';
import Plus from '../svgs/Plus';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

export default function Notes(props) {
  const [itemMode, setItemMode] = useState(false);
  const [selectedNotePath, setSelectedNotePath] = useState(selectFirstNote(props.notes));
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  function renderContent(keyGiven, index) {
    const children = getChildren(index);
    return Object.keys(children).map((key, index_) => {
      return (
        <div
          key={`title${index_}`}
          className={[
            Object.keys(children).includes('children') === key ? 'folder_tab' : 'note_tab',
            keyGiven === key ? 'tab_selected' : '',
          ].join(' ')}
          onClick={() => {
            setSelectedNotePath([
              ...selectedNotePath.slice(0, index),
              ...selectFirstNote(children, index_),
            ]);
          }}
        >
          {children[key].name}
        </div>
      );
    });
  }
  function getChildren(indexGiven) {
    let level = props.notes;
    selectedNotePath.forEach((key, index) => {
      if (index < indexGiven) {
        console.log(key);
        console.log(selectedNotePath);

        level = level[key];
      }
    });

    return level;
  }
  return (
    <div style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} className='notes_container'>
      <div className='title_tab'>
        Your mind is for <span className='text_bold_title  color_text_notes'>having ideas</span>,
        not <span className='text_bold_title color_text_notes'>holding them.</span>{' '}
      </div>
      <div className='container_info_tab'>
        <ul
          className='hs'
          style={{
            display: 'grid',
            gridGap: 'calc(20px / 2)',
            gridTemplateColumns: `repeat(${
              selectedNotePath.filter(element => element != 'children').length
            }, 200px) calc(80vw - 230px)`,
            gridTemplateRows: '100%',
            width: '100%',
            height: 'calc(100vh - 200px)',
            overflowX: 'auto',
            scrollSnapType: 'x proximity',
            paddingBottom: 'calc(0.75 * 20px)',
            marginBottom: 'calc(-0.5 * 20px)',
          }}
        >
          {selectedNotePath.map((key, index) => {
            if (key !== 'children') {
              return (
                <div key={`sad${key}${index}2`} className='item'>
                  {renderContent(key, index)}
                </div>
              );
            }
            return null;
          })}
          <div className='item'>
            <MdEditor
              value={getChildren(selectedNotePath.length).content}
              style={{ width: 'calc(80vw - 250px)' }}
              renderHTML={text => mdParser.render(text)}
              //   onChange={handleEditorChange}
            />
          </div>
        </ul>
        <div
          className='main_button_container_notes reversed'
          onClick={() => {
            props.onClose('calendar');
          }}
        >
          <div className='main_button linear_grad'></div>
          <Ticket />
        </div>
        <div
          className={['create_event_button_notes', itemMode ? 'cancel' : null].join(' ')}
          onClick={() => setItemMode(!itemMode)}
        >
          <Plus />
        </div>
      </div>
    </div>
  );
}

function parseNotesList(notes) {
  const parsed_notes = [];
  Object.keys(notes).forEach((key, index) => {
    var children = [];
    var content_note = {
      id: notes[key].id,
    };
    if (Object.keys(notes[key]).includes('children')) {
      children = parseNotesList(notes[key].children);
    }
    content_note['children'] = children;
    parsed_notes.push(content_note);
  });
  return parsed_notes;
}

function selectFirstNote(notes_not_parsed, index = 0) {
  const parsedNotes = parseNotesList(notes_not_parsed);
  if (parsedNotes.length === 0) {
    return [];
  }
  if (parsedNotes[index].children.length > 0) {
    return [parsedNotes[index].id, 'children', ...selectFirstNote(parsedNotes[index].children)];
  }
  return [parsedNotes[index].id];
}

function getListDirNotes(notes) {
  return Object.keys(notes).map((key, index) => {
    return notes[key].name;
  });
}
