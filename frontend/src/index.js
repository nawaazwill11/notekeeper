import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Utility from './components/Utility';
import { Layout } from 'antd';


function writer(data) {
    console.log('writer', data)
    new Utility().request.post('http://localhost:5000/api/writeData', data)
        .then((response) => console.log(response));
}

window.onload = function () {
    const util = new Utility();

    util.request.get('http://localhost:5000/api/loadData')
        .then((response) => {
            const data = util.parseData.json(response.data);
            if (data) {
                loadApp(<App data={data} writer={writer}/>);
            } 
            else {
                loadApp(<LoadError error="Faulty data" />);
            }
        })
        .catch((error) => {
            console.error(error);
            loadApp(<LoadError error="500 - Server Error Occurred" />);
            
        })
    
}

const { Header, Content, Footer } = Layout;

function loadApp(App) {
    ReactDOM.render(
        <React.StrictMode>
            <Layout>
                <Header>Header</Header>
                <Content>{App}</Content>
                <Footer>Footer</Footer>
            </Layout>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

function LoadError(props) {
    return (
        <h1>{props.error}</h1>
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
