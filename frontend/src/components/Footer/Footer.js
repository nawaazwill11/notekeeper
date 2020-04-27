import React from 'react';
import autoBind from 'auto-bind';
import { Layout, Row, Col } from 'antd';
import './styles/styles.scss';

const { Footer } = Layout;

class _Footer extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    render() {
        return (
            <Footer>
                <Row justify="center">
                    <Col xm={24} sm={16} md={8}>
                        <div className="site-info">
                            <pre><a href="https://github.com/nawaazwill11/notekeeper" target="_blank" rel="noopener noreferrer">Github</a> • <a href="https://www.linkedin.com/in/nawaaz-kortiwala-a01099113/" target="_blank" rel="noopener noreferrer">Nawaaz Kortiwala</a></pre>
                        </div>
                    </Col>
                </Row>
            </Footer>
        )
    }
}

export default _Footer;