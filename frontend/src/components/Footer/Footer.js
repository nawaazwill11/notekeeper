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
                        <div id="site-author">
                            Made by &nbsp; - &nbsp;
                            
                            <a href="https://www.instagram.com/nawaazkortiwala/" target="_blank" rel="noopener noreferrer">
                                Nawaaz Kortiwala
                            </a> 
                            <br />(2020)                            
                        </div>
                    </Col>
                </Row>
            </Footer>
        )
    }
}

export default _Footer;