import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { FaFile } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = (props) => {
    const {googleSignIn} = UserAuth();
    const {user, logout} = UserAuth();
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');

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

    const handleChange = (e) => {
        setSearchValue(e.target.value);

        // If the search bar is empty, show all brags
        if (e.target.value === '') {
            props.handleSearchResult();
        }
    }

    const handleKeyUp = () => {
        search();
    };

    const search = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/search?useremail=${user.email}&searchstring=${searchValue}`, {
                    method: 'GET',
                }
            );
			const jsonData = await response.json();
            props.handleSearchResult(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    };
    
    useEffect(() => {
        if (user != null) {
            navigate('/brag');
        }
    }, [user, navigate]);

    return (
        <header>
            <nav>
                <div className="logo"><FaFile className="logo_icon" />BRAGBOX</div>
                <div className="nav_rightSide">
                    {user?.displayName ? (
                        <>
                            <dialog ref={modalRef} className="popup signout">
                                <div className="message">Sign out as {user?.displayName}?</div>
                                <button className="btn btn_small" onClick={handleSignOut}>Sign Out</button>
                                <button className="btn btn_small btn_transparent" onClick={closeModal}>Cancel</button>
                            </dialog>
                            <div className="navbar_search">
                                <input type="text" value={searchValue} onChange={handleChange} onKeyUp={handleKeyUp} placeholder="Search" />
                                <AiOutlineSearch onClick={search} className="search_icon" title="Search" alt="search" />
                            </div>

                            <button className="nav_button no_border" onClick={openModal}>{user?.displayName}</button> 
                            <img referrerPolicy="no-referrer" className="profilePicture" src={user?.photoURL} onClick={openModal} alt="pic" />
                        </>
                    ) : (
                        <button className="nav_button" onClick={handleGoogleSignIn}>Sign In</button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;