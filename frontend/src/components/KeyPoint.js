import React from 'react';
import KeyPointEvents from './KeyPointsEvents';
import autoBind from 'auto-bind';

class KeyPoint extends React.Component {
    constructor(props) {
        super(props);
        this.events = new KeyPointEvents();
        autoBind(this);
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
                                <input className="inp-flat" type="text" placeholder="Keypoint" data-type="keypoint" data-block_id={kp.id}
                                    defaultValue={kp.keypoint}
                                    onKeyUp={(e) => {
                                        this.events.input.change(e, 'keypoint', this.props.events.updateKeyPoint)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="kp-block-layer">
                            <div className="kp-desc">
                                <input className="inp-flat" type="text" placeholder="Description" data-type="desc" data-block_id={kp.id} 
                                    defaultValue={kp.desc ? kp.desc : ''} 
                                    onKeyUp={(e) => {
                                        this.events.input.change(e, 'desc', this.props.events.updateKeyPoint)
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
                                    -
                                </button>
                            </div>
                            <div className="action-node copy">
                                <button 
                                    data-block_id={kp.id}
                                    onClick={(e) => { this.events.actions.duplicate(e, this.props.events.duplicateBlock) }}>
                                    C
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default KeyPoint;