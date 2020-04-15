import React from 'react';
import './Nav.css';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                {
                    name: 'Notekeeper',
                    href: '/'
                }
            ]
        }
    }
    itemList() {
        return (
            <ul className="nav-item-container">
                {this.state.items.map(item => {
                    return (
                        <li key={item.name} className="nav-item">
                            <a className="nav-links" href={item.href}>{item.name} /</a>
                        </li>
                    )})
                }
            </ul>
        )
    }
    render() {
        return (
            <nav className="navbar-container">
                {this.itemList()}
            </nav>
        );
    }
}

export { Nav };