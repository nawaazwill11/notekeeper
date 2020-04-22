import React from 'react';
// import  { Nav }  from './components/nav';
// import { Notes } from './components/notes';
// import { Button } from 'antd';
import Note from './components/Note';
import Editor from './components/Editor';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            mode: 'view',
            note_data: {}
        }
    }
    toggleMode(note_data) {
        this.setState({
            mode: this.state.mode === 'view' ? 'edit': 'view',
            note_data: note_data
        })
        console.log('Mode', this.state.mode);
    }
    render() {
        return (
            <div id="content">
                <div id="control-container">
                    <div id="control-content">
                        <div id="add-note" className="control">
                            <button className="btn">New note</button>
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
                        {this.data.notes.map((note) => {
                            return (
                                <Note 
                                    key={"_" + note.id} data={{
                                        note: note,
                                        kp_type: 'key_only',
                                    }} 
                                    toggleMode={this.toggleMode.bind(this)}
                                />
                            )
                        })}
                    </div>
                </main>
                {this.state.mode === 'edit' ? <Editor data={{note_data: this.state.note_data}} /> : ''}
            </div>
        )
    }
}

export default App;
