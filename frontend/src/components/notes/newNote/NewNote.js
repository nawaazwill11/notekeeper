import React from 'react';

class NewNote extends React.Component {
    render() {
        return (
            <div key={this.props.di} className="note" onClick={()=>{
                    const app = this.props.app;
                    app.setState({
                        note: app.state.note + 1
                    }, function () {
                        console.log(app.state.note);
                    })
                }}>
                {this.props.id}
            </div>
        )
    }
}

export { NewNote };