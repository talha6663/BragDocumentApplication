import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { FaFile } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from "../Theme";
import { UserAuth } from '../context/AuthContext';
import ButtonSmall from './forms/ButtonSmall';

const Navbar = (props) => {
    const {googleSignIn} = UserAuth();
    const {user, logout} = UserAuth();
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const { theme, toggleTheme } = useContext(ThemeContext);

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
        <header className="fixed top-0 w-full">
            <nav className="flex items-center justify-between h-16 px-20 bg-opacity-80 bg-slate-100 border-b-slate-200 dark:bg-zinc-950 border-b-2 dark:border-b-gray-800">
                <div className="flex flex-row items-center font-bold text-3xl tracking-tighter text-slate-600 dark:text-slate-400"><FaFile className="text-xl text-orange-600" />BRAGBOX</div>
                <div className="flex flex-row items-center relative">
                    {user?.displayName ? (
                        <>
                            <div className="p-0 w-96 flex items-center border-2 rounded-full text-slate-600 border-slate-300 dark:border-slate-600 dark:bg-slate-600">
                                <input type="text" className="w-full bg-transparent border-transparent px-4 py-1 placeholder:text-slate-600 text-slate-600 dark:placeholder:text-slate-400 dark:text-slate-300 focus:outline-none" value={searchValue} onChange={handleChange} onKeyUp={handleKeyUp} placeholder="Search" />
                                <AiOutlineSearch onClick={search} className="w-6 h-6 text-slate-600 dark:text-slate-400 cursor-pointer mr-3" title="Search" alt="search" />
                            </div>
                            <div onClick={() => toggleTheme()} className="mx-1 p-3 cursor-pointer text-slate-600 dark:text-slate-400" title={`${theme} theme`}>
                                {theme === "dark" ? <MdDarkMode /> : <MdLightMode />}
                            </div>

                            <div className="mr-2 py-3 text-slate-600 dark:text-slate-400 cursor-pointer" onClick={openModal}>{user?.displayName}</div> 
                            <img referrerPolicy="no-referrer" className="border-gray-500 border-2 rounded-full w-11 h-11 m-0" src={user?.photoURL} onClick={openModal} alt="pic" />

                            <dialog ref={modalRef} className="text-gray-600 bg-slate-50 border-slate-500 dark:text-gray-400 dark:bg-gray-900 rounded-md border-4 text-center absolute top-12 -right-80">
                                <div className="mb-6">Sign out of account {user?.displayName}?</div>
                                <ButtonSmall click={handleSignOut} value={"Sign Out"} />
                                <ButtonSmall click={closeModal} value={"Cancel"} />
                            </dialog>
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