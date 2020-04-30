import React from 'react';
import { KeyPoint } from '../../components';
import NoteEvents from './NoteEvents';
import { Row, Col, Card } from 'antd';
import './styles/styles.scss';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.events = new NoteEvents();
    }

    render() {
        const note = this.props.note;
        const key_points = note.data.map((kp) => {
            return(
                <Col span={22} key={kp.id}>
                    <KeyPoint
                        type='key_only'
                        kp={kp}
                        />
                </Col>
            )
        });

        return (
            
            <Card size="small" id={note.id} title={note.title} className="note"
                style={{'width': '100%'}}
                onMouseEnter={this.events.note.onMouseEnter}
                onMouseLeave={this.events.note.onMouseLeave}
                onClick={(e) => {
                    this.events.note.onClick(e, note, this.props.events.toggleMode)
                }}>
                <Row gutter={[8, 16]}>
                    {key_points}
                </Row>

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
                            {/* <li className="note-menu-item">Archive</li> */}
                        </ul>
                    </div>
                </div>
            </Card>
        );
    }

}

export default Note;