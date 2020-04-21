import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        console.log(this.data.note);
    }

    render() {
        return <div className="editor"></div>;
    }
}

export default Editor;