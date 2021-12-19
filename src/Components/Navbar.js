import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="nav-cont">
                    <NavLink to='/'><span>{this.props.appName}</span></NavLink>
                    <NavLink to='favourites'><span>{this.props.favourites}</span></NavLink>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar;