import React from 'react';
import  { Nav }  from './components/nav';
import { Notes } from './components/notes';
import { Button } from 'antd';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteSelected: false,
            note: 0
        }
    }
    noteSelect(note) {
        this.setState({
            noteSelected: !this.state.noteSelected,
            note: note
        })
    }
    render() {
        // let app;
        // if (!this.state.noteSelected) {
        //     app = (
        //         <div id="App">
        //             <Nav />
        //             <Notes app={this} />
        //         </div>
        //     );
        // }
        // else {
        //     app = (
        //         <div id="App">
        //             <Nav items={this.state.note}/>
        //             <Notes note={this.state.note}/>
        //         </div>
        //     );
        // }
        return <div></div>
    }
}

export default App;
