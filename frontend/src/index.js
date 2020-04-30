import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Header, Utility, Footer } from './components';
import { Layout } from 'antd';
import { Row, Col, Typography } from 'antd';

function writer(data) {
    console.log('writer', data)
    new Utility().request.post('/api/writeData', data)
        .then((response) => console.log(response));
}

window.onload = function () {
    const util = new Utility();

    util.request.get('/api/loadData')
        .then((response) => {
            if(response.status === 200) {
                response.json()
                    .then((data) => {
                       loadApp(<App data={data} writer={writer}/>);
                    })
            } 
            else {
                loadApp(<LoadError error="Faulty data" />);
            }
        })
        .catch((error) => {
            console.error(error);
            loadApp(<LoadError error={"500 - Server Error Occurred " + error} />);
            
        })
    
}

function loadApp(App) {
    const { Content } = Layout;

    ReactDOM.render(
        <Layout>
            <Header />
            <Content>{ App }</Content>
            <Footer />
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
