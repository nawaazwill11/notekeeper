import React from 'react';

import { NoteAdd }  from './noteAdd';
import  { NewNote }  from './newNote';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            noteList: []
        }
    }
    newNote() {
        this.setState({
            count: this.state.count + 1,
            noteList: [
                ...this.state.noteList,
                {
                    content: this.state.count
                }
            ]
        })
    }
    componentDidMount() {

    }
    
    render() {
        return (
            <main id="main-content">
                <NoteAdd addNewNote={this.newNote.bind(this)}/>
                {this.state.noteList.map((note) => {
                    return <NewNote key={note.content} id={note.content} app={this.props.app}/>
                })}
                
            </main>
        )
    }
}


export { Notes };