import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav>
            <div className="logo">
                BRAGBOX
            </div>
            <div className="menu">
                <div><Link to="/">Home</Link></div>
                <div><Link to="/brag">New Brag</Link></div>
                <div><Link to="/profile">My Profile</Link></div>
                <div>Logout</div>
            </div>
        </nav>
	);
};

export default Navbar;