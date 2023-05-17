import React, { useEffect, useRef } from 'react';
import { FaFile } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
    const {googleSignIn} = UserAuth();
    const {user, logout} = UserAuth();
    const navigate = useNavigate();
    const modalRef = useRef(null);

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

    const openModal = () => {
		const modal = modalRef.current;
		if (modal) {
			modal.close();
			modal.show();
		}
	};

	const closeModal = () => {
		const modal = modalRef.current;
		if (modal) {
			modal.close();
		}
	};
    
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
                        <dialog ref={modalRef} className="popup signout">
                            <div className="message">Signout out as {user?.displayName}?</div>
                            <button className="btn btn_small" onClick={handleSignOut}>Sign Out</button>
                            <button className="btn btn_small btn_transparent" onClick={closeModal}>Cancel</button>
                        </dialog>

                        <button className="nav_button no_border" onClick={openModal}>{user?.displayName}</button> 
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