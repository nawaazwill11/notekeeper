import React from 'react';

class Utility {
    ajax = {
        /**
         * @param {String} method 
         * @param {String} url 
         * @param {Boolean} async 
         */
        get: function (url, async) {
            return new Promise((resolve, reject) => {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        resolve(xmlhttp.response);
                    }
                    else if(xmlhttp.readyState === 4 && xmlhttp.status === 500) {
                        reject('500 - Server Error Occured');
                    }
                }
                xmlhttp.open(method, url, async);
                xmlhttp.send();
            });
        }
    }
    parseData = {
        json: function(data) {
            data = JSON.parse(data);
            if (typeof(data) !== 'object') return false;
            return data;
        }
    }
}

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
            sequence: sequence + 1
        });
        return this.data.note_id + '_kp_' + this.state.sequence;
    }
    html() {
        if (this.data.type === 'key_only') {
            return this.data.keypoint.map((kp) => {
                return <div key={this.getNextSequence()} className="keypoint">{kp.keypoint}</div>
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

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    render() {
        return (
            <div className="note">

                <div className="note-content">
                    <div className="note-menu">
                        <div className="note-menu-img">
                            <img src="menu.svg" alt="menu" />
                        </div>
                        <div className="note-menu-list-container">
                            <ul className="note-menu-list">
                                <li className="note-menu-item">Edit</li>
                                <li className="note-menu-item">Delete</li>
                                <li className="note-menu-item">Archive</li>
                            </ul>
                        </div>
                    </div>
                    <div className="note-content">
                        <div className="note-title">
                            <b>{this.data.note.title}</b>
                        </div>
                        <div className="note-main">
                            <KeyPoints data={{
                                note_id: this.data.note.id,
                                type: this.data.kp_type
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class Engine extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
    }
    render() {
        return (
            <div id="container">
                <div id="control-container">
                    <div id="control-content">
                        <div id="add-note" className="control">
                            <button className="btn">New note</button>
                        </div>
                        <div id="delete-note" className="control">
                            <button className="btn">Delete notes</button>
                        </div>
                    </div>
                </div>
                <main id="notes-container">
                    <div id="checker">
                        <input type="checkbox" />
                    </div>
                    <div id="notes-content">
                        {this.props.notes.map((note) => {
                            return (
                                <Note data={{
                                    note: note,
                                    kp_type: 'key_only'
                                }} />
                            )
                        })}
                    </div>
                </main>
            </div>
        )
    }
}

export default Engine;