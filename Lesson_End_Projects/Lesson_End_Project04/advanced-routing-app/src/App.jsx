// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { UserProvider } from './context/UserContext';
function App() {
	return (
		<UserProvider>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/user/:userId' element={<UserProfile />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
			<Footer />
		</UserProvider>
	);
}
export default App;
