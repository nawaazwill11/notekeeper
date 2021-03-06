import React from 'react';
import autoBind from 'auto-bind';
import { Row, Col, Input } from 'antd';
import '../styles/LinkPanel.scss';
import LinkPanelEvents from './LinkPanelEvents';

class LinkPanel extends React.Component {
    constructor(props) {
        super(props);
        this.events = new LinkPanelEvents();
        const active = false;
        this.state = {
            link_notes: [],
            panel: {
                active: false,
                styles: {
                    top: 'unset',
                    left: 'unset',
                    display: 'none'
                }
            }
        }
        autoBind(this);
    }
    updateState(changes) {
        this.setState({
            ...this.state,
            ...changes,
        })
    }
    updatePanel(changes) {
        this.updateState(changes);
    }
    isActive() {
        return this.state.panel.active
    }

    updateListNotes(notes) {
        console.log(notes);
        const changes = notes.map((note) => note.title);
        this.updateState({ link_notes : changes });
    }

    listNoteElements() {
        let i = 0;
        const list = this.state.link_notes.map((note) => {
            return (
                <li key={++i} className="note-link-search-item">
                    {note}
                </li>
            )
        });

        return (
            <ul>
                {list}
            </ul>
        )
    }

    render() {
        return (
            <Row id="link-panel" style={{ ...this.state.panel.styles }}>
                <Col className="note-search" spam={24}>
                    <Input className="note-search-inp" placeholder="Search note" 
                        onKeyDown={(e) => { this.events.input.keyDown(e, this.props.events.matchedNotes, this.updateListNotes) }}/>
                </Col>
                <Col className="note-list" span={24}>
                    {this.state.link_notes.length ? this.listNoteElements(): 'List'}
                </Col>
            </Row>
        )
    }
}
export default LinkPanel;