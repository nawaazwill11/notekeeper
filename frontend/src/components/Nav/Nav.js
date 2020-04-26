import React from 'react';
import { Layout, Anchor, Grid } from 'antd';
import { Row, Col, Typography } from 'antd';
import './Nav.scss';

const { Header } = Layout;
const { Link } = Anchor;

class Nav extends React.Component {
    render() {
        return (
            <Header>
                <Row className="nav-row">
                    <Col span={24}>
                        <Anchor affix={false} style={{height: '64px'}}>
                            <Link href="#components-anchor-demo-static" title="NoteKeeper" />
                        </Anchor>
                    </Col>
                </Row>
            </Header>
        )
    }
}
export default Nav;