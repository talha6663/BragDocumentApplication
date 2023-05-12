import React, { useEffect } from 'react';
import { FaFile } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
    const {googleSignIn} = UserAuth();
    const {user, logout} = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        if (user != null) {
            navigate('/brag');
        }
    }, [user, navigate]);

    return (
        <nav>
            <div className="logo"><FaFile className="logo_icon" />BRAGBOX</div>
            <div className="nav_rightSide">
                {user?.displayName ? (
                    <>
                        <button className="nav_button no_border" onClick={handleSignOut}>Sign Out - {user?.displayName}</button> 
                        <img referrerPolicy="no-referrer" className="profilePicture" src={user?.photoURL} alt="pic" />
                    </>
                ) : (
                    <button className="nav_button" onClick={handleGoogleSignIn}>Sign In</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;