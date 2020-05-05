import React from 'react';
import KeyPointEvents from './KeyPointsEvents';
import autoBind from 'auto-bind';
import './styles/styles.scss';
import LinkPanel from './components/LinkPanel';

class KeyPoint extends React.Component {
    constructor(props) {
        super(props);
        this.events = new KeyPointEvents();
        this.panelShifter = React.createRef();
        autoBind(this);
    }

    updateState(changes) {
        this.setState({
            ...changes
        })
    }

    render() {
        const kp = this.props.kp;
        console.log(kp);
        if (this.props.type === 'key_only') {
            return <div data-id={kp.id} className="keypoint">{kp.keypoint}</div>
        }
        else {
            const placeholder = (text ) => {
                return <span className="placeholder">{text}</span>
            };
            const link_panel = (
                <LinkPanel ref={this.panelShifter} events={{
                    matchedNotes: this.props.events.matchedNotes
                }}/>
            )
            const panel_events = {
                updateLinkPanel: (changes) => this.panelShifter.current.updatePanel(changes),
                isLinkPanelActive: () => this.panelShifter.current.isActive(),
                // setActive: (active) => this.panelShifter.current.setActive(active)
            }
            return (
                <div id={kp.id} className="kp-block">
                    <div className="kp-block-content">
                        <div className="kp-block-layer">
                            <div className="kp-keypoint">
                                <div className="inp-flat" data-hasdata={kp.keypoint ? 'true': 'false'} data-block_id={kp.id} contentEditable="true"
                                    suppressContentEditableWarning={true}
                                    onFocus={ this.events.input.focus }
                                    onBlur={( e ) => { this.events.input.focusOut(e, 'Keyword') }}
                                    onKeyUp={(e) => {
                                        this.events.input.change(e, 'keypoint', kp, {
                                            updateKeyPoint: this.props.events.updateKeyPoint,
                                            ...panel_events
                                        })
                                    }}>{kp.keypoint ? kp.keypoint : placeholder('Keypoint')}</div>
                            </div>
                        </div>
                        <div className="kp-block-layer">
                            <div className="kp-desc">
                                <div className="inp-flat" data-block_id={kp.id} contentEditable="true"
                                    suppressContentEditableWarning={true}
                                    onFocus={ this.events.input.focus }
                                    onBlur={( e ) => { this.events.input.focusOut(e, 'Description') }}
                                    onKeyUp={(e) => {
                                        this.events.input.change(e, 'desc', kp, {
                                            updateKeyPoint: this.props.events.updateKeyPoint,
        
                                        })
                                    }}>
                                    {kp.desc ? kp.desc : placeholder('Description')}
                                </div>
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
                    {link_panel}
                </div>
            );
        }
    }
}

export default KeyPoint;