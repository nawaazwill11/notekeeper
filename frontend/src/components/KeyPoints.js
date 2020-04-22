import React from 'react';

class KeyPoints extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            sequence: 0,
        }
    }
    getNextSequence() {
        this.setState({
            sequence: this.state.sequence + 1
        });
    }
    html() {
        if (this.data.type === 'key_only') {
            return this.data.keypoints.map((kp) => {
                return <div key={kp.id} id={kp.id} className="keypoint">{kp.keypoint}</div>
            })
        }
        else {
            return this.data.keypoints.map((kp) => {
                return (
                    <div key={kp.id} className="kp-block" id={kp.id}>
                        <div className="kp-block-content">
                            <div className="kp-block-layer">
                                <div className="kp-keypoint">
                                    <input className="inp-flat" type="text" placeholder="Keypoint" 
                                        defaultValue={kp.keypoint ? kp.keypoint : ''} 
                                    />
                                </div>
                            </div>
                            <div className="kp-block-layer">
                                <div className="kp-desc">
                                    <input className="inp-flat" type="text" placeholder="Description" 
                                        defaultValue={kp.desc ? kp.desc : ''} 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="kp-block-action-container">
                            <div className="kp-block-action">
                                <div className="action-node remove">
                                    <button>-</button>
                                </div>
                                <div className="action-node copy">
                                    <button>C</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })
            
        }
    }
    render() {
        return (
            <div className="key-points">
                {this.html()}
            </div>
        )
    }
}

export default KeyPoints;