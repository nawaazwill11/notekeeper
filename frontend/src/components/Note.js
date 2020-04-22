import React from 'react';
import KeyPoint from './KeyPoint';
import NoteEvents from './NoteEvents';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.note = this.props.note;
        this.events = new NoteEvents();
        // this.state = {
        //     sequence: 0,
        //     // data: this.props.data.data
        // }
    }
    // getNextSequence() {
    //     this.setState({
    //         sequence: this.state.sequence + 1
    //     });
    // }
    render() {
        let count = 0;
        const key_points = this.note.data.map((kp) => {
            return(
                <KeyPoint
                    key={kp.id}
                    type='key_only'
                    kp={kp}
                />
            )
        });

        return (
            <div id={this.note.id} className="note" 
                onMouseEnter={this.events.note.onMouseEnter}
                onMouseLeave={this.events.note.onMouseLeave}
                onClick={(e) => {
                    this.events.note.onClick(e, this.note, this.props.toggleMode)
                }}
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
                            <b>{this.note.title}</b>
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