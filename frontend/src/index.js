import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Nav, Utility } from './components';
import { Layout } from 'antd';
import { Row, Col, Typography } from 'antd';

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

function loadApp(App) {
    const { Header, Content, Footer } = Layout;

    ReactDOM.render(
        <Layout>
            <Nav />
            <Content>{ App }</Content>
            <Footer>Footer</Footer>
        </Layout>,
        document.getElementById('root')
    );
}

function LoadError(props) {
    const { Title } = Typography;
    return (
        <Row justify="center" gutter={[8, 24]} align="middle">
            <Col className="gutter-row">
                <Title>{ props.error }</Title>
            </Col>
        </Row>
    )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
