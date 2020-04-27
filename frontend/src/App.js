import React from 'react';
import autoBind from 'auto-bind';
import { Editor, Note }  from './components';
import _ from 'lodash';
import { Row, Col, Button } from 'antd';
import './App.scss'
import AppEvents from './AppEvents';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            mode: 'view',
            note: {}
        }
        this.events = new AppEvents();
        autoBind(this);
    }
    toggleMode(type, note={}) {
        let mode = this.state.mode;
        
        if (Object.keys(note).length) {
            if (type === 'save') {
                // console.log('Note in toggle: data', this.data.notes[0]);
                // console.log('Note in toggle', note.id);
                const noteIndex = this.data.notes.findIndex((_note) => _note.id === note.id);
                if (noteIndex === -1) this.data.notes.push(note);
                else this.data.notes[noteIndex] = note;
            }
            else if (type === 'delete') {
                _.remove(this.data.notes, (_note) => _note.id === note.id);
                note = {};
                mode = 'edit';
            }
        }

        mode = mode === 'view' ? 'edit' : 'view';
        
        this.events.toggled(mode);
        this.updateState(mode, note);
    }

    updateState(mode, note) {

        this.setState({
            mode: mode,
            note: note
        }, function () {
            if (this.state.mode === 'view'){
                this.props.writer(this.data);
                // console.log('Mode', this.state.mode);
                // console.log('Note', this.state.note);
            }
        });

    }

    nextSequence() {
        if (this.data.notes.length) {
            const last_note = this.data.notes[this.data.notes.length - 1];
            // console.log('last note', last_note.id);
            return last_note.id + 1;
        }
        return 1;
    }
    render() {
        // console.log('App render', this.data);
        const notes = this.data.notes.map((note) => {
            // console.log('Inside note mapping', note);
            return (
                <Col key={"_" + note.id} className="note-main"
                    xs={24} sm={12} md={8} lg={6}>
                    <Note 
                        note={note}
                        events={{
                            toggleMode: this.toggleMode
                        }}
                    />
                </Col>
            );
        });

        return (
            <Row justify="center">
                <Col id="content" span={22}>
                    <Row justify="center" gutter={[16, 24]} style={{marginTop: '20px'}}>
                        <Col id="controls" className="gutter-row control" span={23}>
                            <Row>
                                <Col className="control-item" span={4}>
                                    <Button type="primary"
                                        onClick={() => {
                                            const id = this.nextSequence();
                                            this.toggleMode(null, {id: id, title: '', data: [], kp_id_seq: 0})}}>
                                        New Note
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col id="note-container" span={24}>
                            <div id="checker">
                                <input type="checkbox" />
                            </div>
                            <div className="site-card-wrapper">
                                <Row>
                                    {notes}
                                </Row>
                            </div>
                            {/* <div id="notes-content">
                                {notes}
                            </div> */}
                        </Col>
                        {this.state.mode === 'edit' 
                            ? <Editor 
                                data={{note: this.state.note}} 
                                toggleMode={this.toggleMode} /> 
                            : ''
                        }    
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default App;
