import React from 'react';
import autoBind from 'auto-bind';
import KeyPoint from './KeyPoint';
import EditorEvents from './EditorEvents';


class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.note = this.props.data.note;
        this.events = new EditorEvents();
        this.current_note = {
            id: this.note.id,
            title: this.note.title ? this.note.title : '',
            data: this.note.data ? this.note.data : []
        }
        this.state = {
            note: this.current_note
        }
        autoBind(this);
    }

    updateState(changes) {
        this.setState({
            ...this.state.note,
            ...changes
        })
        console.log(this.state)
    }
    
    updateKeyPoint(data) {
        const id = data.id;
        const index = this.current_note.data.findIndex((data) => data.id === id);
        this.current_note.data[index] = {
            ...this.current_note.data[index],
            ...data
        };
        console.log(this.current_note.data);
    }

    removeBlock(block_id) {
        const index = this.current_note.data.findIndex((data) => data.id === block_id);
        this.current_note.data.splice(index, 1);
        console.log(this.current_note.data.length);
        this.updateState(this.current_note)
    }


    render() {
        const note = this.current_note;
        const key_points = note.data.map((kp) => {
            return (
                <KeyPoint
                    key={kp.id}
                    title={note.title}
                    kp={kp}
                    events= {{
                        updateKeyPoint: this.updateKeyPoint,
                        removeBlock: this.removeBlock
                    }}
                />
            )
        })
        return (
            <div id="editor-container">
                <div id="editor-panel">
                    <div id="editor-content">
                        <div id="editor-close">
                            <button 
                                onClick={(e) => {
                                    this.events.close.onClick(e, this.current_note, this.props.toggleMode)
                                }}>
                                x
                            </button>
                        </div>
                        <div id="note-title">
                            <input type="text" placeholder="Title" defaultValue={note.title} />
                        </div>
                        <div id="note-main-container">
                            <div id="note-main">
                                <div id="kp-container">
                                    <div id="kp-main">
                                        {key_points}
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