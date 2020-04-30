import React from 'react';
import KeyPointEvents from './KeyPointsEvents';
import autoBind from 'auto-bind';
import './styles/styles.scss';
import { Input } from 'antd';
import LinkPanel from './components/LinkPanel';

class KeyPoint extends React.Component {
    constructor(props) {
        super(props);
        this.events = new KeyPointEvents();
        this.state = {
            panel: false
        }
        autoBind(this);
    }

    updateState(changes) {
        this.setState({
            ...changes
        })
    }

    toggleHash(hash) {
        this.updateState({ panel: hash })
    }

    appendLinkPanel() {
        return (
            <LinkPanel events={{
                matchedNotes: this.props.events.matchedNotes
            }} />
        )
    }

    render() {
        const kp = this.props.kp;
        if (this.props.type === 'key_only') {
            return <div data-id={kp.id} className="keypoint">{kp.keypoint}</div>
        }
        else {
            return (
                <div id={kp.id} className="kp-block">
                    <div className="kp-block-content">
                        <div className="kp-block-layer">
                            <div className="kp-keypoint">
                                <Input className="inp-flat" placeholder="Keypoint" data-type="keypoint" data-block_id={kp.id}
                                    defaultValue={kp.keypoint}
                                    onKeyUp={(e) => {
                                        this.events.input.change(e, 'keypoint', {
                                            updateKeyPoint: this.props.events.updateKeyPoint,
                                            toggleHash: this.toggleHash
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="kp-block-layer">
                            <div className="kp-desc">
                                <Input className="inp-flat" placeholder="Description" data-type="desc" data-block_id={kp.id} 
                                    defaultValue={kp.desc ? kp.desc : ''} 
                                    onKeyUp={(e) => {
                                        this.events.input.change(e, 'keypoint', {
                                            updateKeyPoint: this.props.events.updateKeyPoint,
                                            toggleHash: this.toggleHash
                                        })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="kp-block-action-container">
                        <div className="kp-block-action">
                            <div className="action-node remove">
                                <button 
                                    data-block_id={kp.id}
                                    onClick={(e) => { this.events.actions.delete(e, this.props.events.removeBlock) }}>
                                    <img src="delete.svg" alt="delete"/>
                                </button>
                            </div>
                            <div className="action-node copy">
                                <button 
                                    data-block_id={kp.id}
                                    onClick={(e) => { this.events.actions.duplicate(e, this.props.events.duplicateBlock) }}>
                                    <img src="copy.svg" alt="copy"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {this.state.panel ? this.appendLinkPanel() : ''}
                </div>
            );
        }
    }
}

export default KeyPoint;