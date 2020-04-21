import React from 'react';
// import  { Nav }  from './components/nav';
// import { Notes } from './components/notes';
// import { Button } from 'antd';
import Note from './components/Note';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            mode: 'view'
        }
    }
    toggleMode() {
        this.setState({
            mode: this.state.mode === 'view' ? 'edit': 'view'
        })
        console.log('Mode', this.state.mode);
    }
    render() {
        return (
            <div id="container">
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
            </div>
        )
    }
}

export default App;
