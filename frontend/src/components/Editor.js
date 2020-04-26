import React from 'react';
import autoBind from 'auto-bind';
import KeyPoint from './KeyPoint';
import EditorEvents from './EditorEvents';
import _ from 'lodash';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.backup_note = this.props.data.note;
        this.events = new EditorEvents();
        this.current_note = _.cloneDeep(this.props.data.note);;
        this.state = {
            note: this.current_note
        }
        autoBind(this);
    }

    updateState() {
        this.setState({
           note: this.current_note
        })

    }
    updateTitle(title) {
        this.current_note.title = title;
        this.updateState(this.current_note);
    }
    updateKeyPoint(data) {
        const id = data.id;
        const index = this.current_note.data.findIndex((data) => data.id === id);
        this.current_note.data[index] = {
            ...this.current_note.data[index],
            ...data
        };
        this.updateState(this.current_note);
    }

    removeBlock(block_id) {
        const index = this.current_note.data.findIndex((data) => data.id === block_id);
        this.current_note.data.splice(index, 1);
        this.updateState();
    }

    addBlock(kp={}) {
        this.current_note.data.push({
            id: this.nextSequence(),
            keypoint: kp.keypoint ? kp.keypoint : '',
            desc: kp.desc ? kp.desc : ''
        });
        this.updateState();
    }

    nextSequence() {
      return `kp_${this.current_note.id}_${++this.current_note.kp_id_seq}`;
    }

    duplicateBlock(kp) {
        this.addBlock(kp);
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
                        removeBlock: this.removeBlock,
                        duplicateBlock: this.duplicateBlock
                    }}
                />
            )
        });

        return (
            <div id="editor-container">
                <div id="editor-panel">
                    <div id="editor-content">
                        <div data-note={this.current_note.id}></div>
                        {/* <div id="editor-close">
                            <button 
                                onClick={(e) => {
                                    this.events.actions.closeEditor(e, this.current_note, this.props.toggleMode)
                                }}>
                                x
                            </button>
                        </div> */}
                        <div id="note-main-container">
                            <div id="note-title">
                                <input type="text" placeholder="Title" defaultValue={note.title} 
                                    onKeyUp={(e) => {
                                        this.events.title.keyUp(e, this.updateTitle)
                                    }}/>
                            </div>
                            <div id="note-main">
                                <div id="kp-container">
                                    <div id="kp-main">
                                        {key_points}
                                    </div>
                                </div>
                                <div id="kp-adder">
                                    <button 
                                        onClick={(e) => {
                                            this.events.actions.addNewBlock(e, this.addBlock)}}>
                                        Add keypoint
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="editor-controls-container">
                            <div id="editor-controls-content">
                                <div id="editor-controls">
                                    <div className="editor-control-node">
                                        <button id="save" onClick={(e) => {
                                            this.events.actions.save(e, this.current_note, this.props.toggleMode)
                                            }}>
                                            Save
                                        </button>
                                    </div>
                                    <div className="editor-control-node">
                                        <button id="discard"
                                            onClick={(e) => {
                                                this.events.actions.close(e, this.backup_note, this.props.toggleMode)
                                            }}>
                                            Discard
                                        </button>
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