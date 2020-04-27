import React from 'react';
import { Layout } from 'antd';
import { Row, Col, Tooltip } from 'antd';
import './styles/styles.scss';

const { Header } = Layout;

class _Header extends React.Component {
    render() {
        return (
            <Header className="nav">
                <Row>
                    <Col span={24}>
                        <Tooltip placement="bottom" title="A Rapid Note-Keeping App">
                            <div className="site-name">
                                NoteKeeper
                            </div>
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
        )
    }
}
export default _Header;