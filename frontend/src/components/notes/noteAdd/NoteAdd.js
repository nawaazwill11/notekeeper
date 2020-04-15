import React from 'react';

class NoteAdd extends React.Component {
  
    render() {
        return (
            <button className="note-adder" onClick={this.props.addNewNote}>+</button>
        )
    }
}


export { NoteAdd };
