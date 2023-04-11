import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './Add';
import App from './App';
import Profile from './Profile';

const RouteSwitch = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/add" element={<Add />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	);
};

export default RouteSwitch;
