import React from 'react';
import autoBind from 'auto-bind';
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
            note: {}
        }
        autoBind(this);
    }
    toggleMode(note={}) {
        this.setState({
            mode: this.state.mode === 'view' ? 'edit': 'view',
            note: note
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
                                    key={"_" + note.id} 
                                    data={{
                                        note: note,
                                        kp_type: 'key_only',
                                    }} 
                                    toggleMode={this.toggleMode.bind(this)}
                                />
                            )
                        })}
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
