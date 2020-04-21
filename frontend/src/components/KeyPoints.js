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
            // ...
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