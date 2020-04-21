import React from 'react';
import KeyPoints from './KeyPoints';
import NoteEvents from './NoteEvents';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.events = new NoteEvents();
    }

    render() {
        return (
            <div id={this.data.note.id} className="note" 
                onMouseEnter={this.events.note.onMouseEnter}
                onMouseLeave={this.events.note.onMouseLeave}
                onClick={(e) => this.events.note.onClick(e, this.data.note, this.props.toggleMode)}
                >
                <div className="note-content">
                    <div className="note-menu" 
                        onClick={this.events.menu.menu.onClick}>
                        <div className="note-menu-img">
                            <img src="menu.svg" alt="menu" />
                        </div>
                        <div className="note-menu-list-container">
                            <ul className="note-menu-list">
                                <li className="note-menu-item" 
                                    onClick={this.events.menu.menuItem.onClick}>
                                    Edit</li>
                                <li className="note-menu-item">Delete</li>
                                <li className="note-menu-item">Archive</li>
                            </ul>
                        </div>
                    </div>
                    <div className="note-content">
                        <div className="note-title">
                            <b>{this.data.note.title}</b>
                        </div>
                        <div className="note-main">
                            <KeyPoints 
                                data={{
                                    note_id: this.data.note.id,
                                    type: this.data.kp_type,
                                    keypoints: this.data.note.data
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Note;