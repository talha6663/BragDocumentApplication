import React from 'react';

const Navbar = () => {
	return (
		<nav>
            <div className="logo">
                BRAGBOX
            </div>
            <div className="menu">
                <div>Home</div>
                <div>Add</div>
                <div>My Profile</div>
                <div>Logout</div>
            </div>
        </nav>
	);
};

export default Navbar;