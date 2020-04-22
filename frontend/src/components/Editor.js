import React from 'react';
import autoBind from 'auto-bind';
import KeyPoints from './KeyPoints';
import EditorEvents from './EditorEvents';


class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.note = this.props.data.note;
        this.events = new EditorEvents();
        this.state = {
            current_note: {
                id: this.note.id,
                title: this.note.title ? this.note.title : '',
                data: this.note.data ? this.note.data : []
            }
        }
        autoBind(this);
    }
    updateNote(note) {
        this.setState({
            current_note: {
                ...current_note,
                title: note.title,
                data: note.data
            }
        });
    }

    render() {
        return (
            <div id="editor-container">
                <div id="editor-panel">
                    <div id="editor-content">
                        <div id="editor-close">
                            <button 
                                onClick={(e) => {
                                    this.events.close.onClick(e, this.props.toggleMode)
                                }}>
                                x
                            </button>
                        </div>
                        <div id="note-title">
                            <input type="text" placeholder="Title" defaultValue={this.note.title} />
                        </div>
                        <div id="note-main-container">
                            <div id="note-main">
                                <div id="kp-container">
                                    <div id="kp-main">
                                        <KeyPoints 
                                            data={{
                                                title: this.state.current_note.title,
                                                keypoints: this.current_note.data}}
                                            updateNote={this.updateNote}
                                        />
                                    </div>
                                </div>
                                <div id="kp-adder">
                                    <button>Add keypoint</button>
                                </div>
                            </div>
                        </div>
                        <div id="editor-controls-container">
                            <div id="editor-controls-content">
                                <div id="editor-controls">
                                    <div className="editor-control-node">
                                        <button id="save">Save</button>
                                    </div>
                                    <div className="editor-control-node">
                                        <button id="discard">Discard</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Editor;