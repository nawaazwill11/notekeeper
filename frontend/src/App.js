import React from 'react';
import autoBind from 'auto-bind';
import Note from './components/Note';
import Editor from './components/Editor';
import _ from 'lodash';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            mode: 'view',
            note: {}
        }
        autoBind(this);
    }
    toggleMode(type, note={}) {
        let mode = this.state.mode;
        
        if (Object.keys(note).length) {
            if (type === 'save') {
                // console.log('Note in toggle: data', this.data.notes[0]);
                // console.log('Note in toggle', note);
                const hasNote = this.data.notes.find((_note) => _note.id === note.id);
                if (!hasNote) this.data.notes.push(note);
            }
            else if (type === 'delete') {
                _.remove(this.data.notes, (_note) => _note.id === note.id);
                note = {};
                mode = 'edit';
            }
        }

        mode = mode === 'view' ? 'edit' : 'view';

        this.updateState(mode, note);
    }

    updateState(mode, note) {
        // this.setState({
        //     ...this.state,
        //     ...changes
        // }, function () {
        //     console.log('Mode', this.state.mode);
        //     console.log('Note', this.state.note);
        // })
        
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
            return (
                <Note 
                    key={"_" + note.id} 
                    note={note}
                    events={{
                        toggleMode: this.toggleMode
                    }}
                />
            );
        });

        return (
            <div id="content">
                <div id="control-container">
                    <div id="control-content">
                        <div id="add-note" className="control">
                            <button className="btn"
                                onClick={() => {
                                    const id = this.nextSequence();
                                    this.toggleMode(null, {id: id, title: '', data: [], kp_id_seq: 0})
                                }}>
                                New note
                            </button>
                        </div>
                        <div id="delete-note" className="control">
                            <button className="btn">Delete notes</button>
                        </div>
                    </div>
                </div>
                <main id="notes-container">
                    <div id="checker">
                        <input type="checkbox" />
                    </div>
                    <div id="notes-content">
                        {notes}
                    </div>
                </main>
                {this.state.mode === 'edit' 
                    ? <Editor 
                        data={{note: this.state.note}} 
                        toggleMode={this.toggleMode} /> 
                    : ''
                }
            </div>
        )
    }
}

export default App;
