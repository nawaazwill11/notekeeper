import React from 'react';
import autoBind from 'auto-bind';
import { KeyPoint } from '../../components';
import EditorEvents from './EditorEvents';
import _ from 'lodash';
import './styles/styles.scss';
import { Row, Col, Button, Input, Divider, Tabs } from 'antd';

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

    updateState(callback) {
        this.setState({
           note: this.current_note,
        }, function () {
            if (callback) callback();
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
        this.updateState();
    }

    removeBlock(block_id) {
        const index = this.current_note.data.findIndex((data) => data.id === block_id);
        this.current_note.data.splice(index, 1);
        this.updateState();
    }

    addBlock(kp={}) {
        const id = this.nextSequence();
        this.current_note.data.push({
            id: id,
            keypoint: kp.keypoint ? kp.keypoint : '',
            desc: kp.desc ? kp.desc : ''
        });
        const callback = () => {
            this.events.kp_focus(id);
        }
        this.updateState(callback);
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
                        duplicateBlock: this.duplicateBlock,
                        matchedNotes: this.props.events.matchedNotes,
                    }}
                />
            )
        });
        
        const { TabPane } = Tabs;

        return (
            <Row id="editor-container">
                <Col id="editor-panel" onKeyDown={this.events.actions.escape} 
                    xs={24} md={18}>
                    <div id="editor-content">
                        <div data-note={this.current_note.id}></div>
                        {/* <div id="editor-close">
                            <button 
                            onClick={(e) => {
                                this.events.actions.closeEditor(e, this.current_note, this.props.events.toggleMode)
                            }}>
                            x
                            </button>
                        </div> */}
                        <Tabs defaultActiveKey="1" tabPosition="top" style={{height: '100%'}}>
                            <TabPane tab="Tab-1" key="1">
                                <div id="note-main-container">
                                    <div id="note-title">
                                        <Input placeholder="Add title" defaultValue={note.title} 
                                            onKeyUp={(e) => {
                                                this.events.title.keyUp(e, this.updateTitle)
                                            }}/>
                                    </div>
                                    <Divider className="divider_" orientation="left" style={{ color: '#333', fontWeight: 'normal' }}></Divider>
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
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Tab-2" key="2">

                            </TabPane>
                        </Tabs>
                        <div id="editor-controls-container">
                            <div id="editor-controls-content">
                                <div id="editor-controls">
                                <div className="editor-control-node">
                                        <Button className="discard" danger
                                            onClick={(e) => {
                                                this.events.actions.close(e, this.backup_note, this.props.events.toggleMode)
                                            }}>
                                            Discard
                                        </Button>
                                    </div>
                                    <div className="editor-control-node">
                                        <Button className="save" type="primary" onClick={(e) => {
                                            this.events.actions.save(e, this.current_note, this.props.events.toggleMode)
                                        }}>
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            
        )
    }
}

export default Editor;