import React, { Component } from "react";
import Plus from "../svgs/Plus";
import Ticket from "../svgs/Ticket";
import { clone } from "../../js_helpers/helpers";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

const MOCK_DATA =
  "Hello.\n\n * This is markdown.\n * It is fun\n * Love it or leave it.";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create_active: false,
      notes: null,
      start: null,
      keys_deep: []
    };

    this.mdParser = new MarkdownIt(/* Markdown-it options */);
    this.createItemMode = this.createItemMode.bind(this);
  }

  handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
  }

  onClose() {
    document.getElementById("notes_position").style.left = "-100vw";
    document.getElementById("notes_position").style.zIndex = "-1000";
    this.setState({ create_active: false });
  }
  open() {
    document.getElementById("notes_position").style.left = 60;
    document.getElementById("notes_position").style.zIndex = "1000";
  }

  createItemMode() {
    this.setState(prevState => ({
      create_active: !prevState.create_active
    }));
  }

  componentDidMount() {
    console.log(this.state.keys_deep);
    console.log(this.state.start);
    console.log(this.state.notes);
  }

  UNSAFE_componentWillMount() {
    Object.keys(this.props.notes).forEach((key, index) => {
      if (!this.state.start && index === 0) {
        this.setState({ start: key });
        this.getDeepContent(this.props.notes[key]);
      }
    });
    const new_notes = clone(this.props.notes);
    this.setState({ notes: new_notes });
  }

  getDeepContent(object) {
    if (typeof object == "object" && object["children"]) {
      let new_deep = this.state.keys_deep;
      new_deep.push("children");
      this.setState({ keys_deep: new_deep });
      this.getDeepContent(
        object["children"][Object.keys(object["children"])[0]]
      );
    } else {
      let new_deep = this.state.keys_deep;
      new_deep.push("content");
      this.setState({ keys_deep: new_deep });
    }
    return;
  }

  renderContent(content, index) {
    if (content === "content") {
      return (
        <MdEditor
          value={MOCK_DATA}
          style={{ width: "calc(80vw - 250px)" }}
          renderHTML={text => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
      );
    }
    var dict = this.state.notes[this.state.start];
    for (let i = 0; i < index; i++) {
      dict = dict[this.state.keys_deep[index]];
    }
    console.log(index);
    console.log("index");
    console.log("dict");
    console.log(Object.keys(dict));
    return (
      <div>
        {content} asd {index}
      </div>
    );
  }

  render() {
    return (
      <div
        style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}
        className="notes_container"
      >
        <div className="title_tab">
          Your mind is for{" "}
          <span className="text_bold_title  color_text_notes">
            having ideas
          </span>
          , not{" "}
          <span className="text_bold_title color_text_notes">
            holding them.
          </span>{" "}
        </div>
        <div className="container_info_tab">
          <ul
            className="hs"
            style={{
              display: "grid",
              gridGap: "calc(20px / 2)",
              gridTemplateColumns: `repeat(${this.state.keys_deep.length}, 200px) calc(80vw - 230px)`,
              gridTemplateRows: "100%",
              width: "100%",
              height: "calc(100vh - 200px)",
              overflowX: "auto",
              scrollSnapType: "x proximity",
              paddingBottom: "calc(0.75 * 20px)",
              marginBottom: "calc(-0.5 * 20px)"
            }}
          >
            <div className="item">
              {Object.keys(this.state.notes).map((key, index) => {
                return (
                  <div
                    key={`sad${key}${index}`}
                    style={Object.assign(
                      {},
                      this.state.start === key ? { fontWeight: "bold" } : {},
                      this.state.notes[key]["children"]
                        ? { backgroundColor: "red" }
                        : {}
                    )}
                    onClick={() => {
                      this.setState({ start: key, keys_deep: [] }, () => {
                        this.getDeepContent(this.state.notes[key]);
                      });
                    }}
                  >
                    {this.state.notes[key].name}
                  </div>
                );
              })}
            </div>
            {this.state.keys_deep.map((key, index) => {
              return (
                <div key={`sad${key}${index}2`} className="item">
                  {this.renderContent(key, index)}
                </div>
              );
            })}
          </ul>
          <div
            className="main_button_container_notes reversed"
            onClick={() => {
              this.onClose();
              this.props.onClose("calendar");
            }}
          >
            <div className="main_button linear_grad"></div>
            <Ticket />
          </div>
          <div
            className={[
              "create_event_button_notes",
              this.state.create_active ? "cancel" : null
            ].join(" ")}
            onClick={this.createItemMode}
          >
            <Plus />
          </div>
        </div>
      </div>
    );
  }
}

// class recursiveComponent extends Component {
//   render() {
//     return (
//       <div>

//       </div>
//     )
//   }
// }
