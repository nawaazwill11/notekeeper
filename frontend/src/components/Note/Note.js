import React from 'react';
import { KeyPoint } from '../../components';
import NoteEvents from './NoteEvents';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.events = new NoteEvents();
    }

    render() {
        const note = this.props.note;
        const key_points = note.data.map((kp) => {
            return(
                <KeyPoint
                    key={kp.id}
                    type='key_only'
                    kp={kp}
                />
            )
        });

        return (
            <div id={note.id} className="note" 
                onMouseEnter={this.events.note.onMouseEnter}
                onMouseLeave={this.events.note.onMouseLeave}
                onClick={(e) => {
                    this.events.note.onClick(e, note, this.props.events.toggleMode)
                }}
                >
                <div className="note-content">
                    <div className="note-menu" 
                        onClick={this.events.menu.open}>
                        <div className="note-menu-img">
                            <img src="menu.svg" alt="menu" />
                        </div>
                        <div className="note-menu-list-container">
                            <ul className="note-menu-list">
                                <li className="note-menu-item" 
                                    onClick={(e) => this.events.menu.edit(e, note, this.props.events.toggleMode)}>
                                    Edit</li>
                                <li className="note-menu-item"
                                    onClick={(e) => this.events.menu.delete(e, note, this.props.events.toggleMode)}
                                    >Delete</li>
                                <li className="note-menu-item">Archive</li>
                            </ul>
                        </div>
                    </div>
                    <div className="note-content">
                        <div className="note-title">
                            <b>{note.title}</b>
                        </div>
                        <div className="note-main">
                            <div className="key-points">
                                {key_points}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Note;