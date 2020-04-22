import React from 'react';
import KeyPoints from './KeyPoints';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        console.log(this.data.note_data);
    }

    render() {
        return (
            <div id="editor-container">
                <div id="editor-panel">
                    <div id="editor-content">
                        <div id="editor-close">
                            <button>x</button>
                        </div>
                        <div id="note-title">
                            <input type="text" placeholder="Title" defaultValue={this.data.note_data.title} />
                        </div>
                        <div id="note-main-container">
                            <div id="note-main">
                                <div id="kp-container">
                                    <div id="kp-main">
                                        <KeyPoints data={{
                                            title: this.data.note_data.title,
                                            keypoints: this.data.note_data.data}} 
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