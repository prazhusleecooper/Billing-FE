import React, { Component } from 'react'; 

import '../Resources/Styling/NavBar.css';

import { NavLink } from "react-router-dom";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className='navbar-navigation-bar'>
                <div className="navbar-logo-section">
                    PraZhus Billing
                </div>
                <div className="navbar-links-section">
                    <NavLink 
                        exact to="/billing"
                        className="navbar-link"
                        activeClassName="navbar-link-active"

                    >
                        Billing
                    </NavLink>
                    {/* <NavLink
                        exact to="/bills"
                        className="navbar-link"
                        activeClassName="navbar-link-active"
                    >
                        Bills
                    </NavLink> */}
                </div>
            </div>
        );
    }
}

export default NavBar;