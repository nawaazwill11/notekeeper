import React from 'react';
import autoBind from 'auto-bind';
import { Row, Col, Input } from 'antd';
import '../styles/LinkPanel.scss';
import LinkPanelEvents from './LinkPanelEvents';

class LinkPanel extends React.Component {
    constructor(props) {
        super(props);
        this.events = new LinkPanelEvents();
        autoBind(this);
    }

    render() {
        return (
            <Row className="link-panel-container">
                <Col className="note-search" spam={24}>
                    <Input className="note-search-inp" placeholder="Search note" 
                        onKeyDown={(e) => { this.events.input.keyDown(e, this.props.events.matchedNotes) }}/>
                </Col>
                <Col className="note-list" span={24}>
                    List
                </Col>
            </Row>
        )
    }
}
export default LinkPanel;