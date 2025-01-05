import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Login from "./components/Login";
import Register from "./components/Register.js";
import Sandbox from "./components/Sandbox.js";
import Cards from "./components/Cards.js";
import CardDetails from "./components/CardDetails.js";
import About from "./components/About.js";
import Navbar from "./components/Navbar.js";
import PageNotFound from "./components/PageNotFound.js";
import MyCards from "./components/MyCards.js";
import FavoriteCards from "./components/FavoriteCards.js";
import {useEffect, useState} from "react";
import {SiteTheme, theme} from "./theme/theme.js";
import UpdateCard from "./components/UpdateCard.js";
import {ToastContainer} from "react-toastify";
import UserDetailes from "./components/UserDetailes.js";
import UpdateUser from "./components/UpdateUser.js";

function App() {
	const [darkMode, setDarkMode] = useState<boolean>(() => {
		const savedTheme = localStorage.getItem("darkMode");
		return savedTheme ? JSON.parse(savedTheme) : false;
	});

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(darkMode));
	}, [darkMode]);

	const handleTheme = () => {
		setDarkMode((oldprev) => !oldprev);
	};

	return (
		<SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
			<Router>
				<ToastContainer />
				<Navbar darkModeButton={handleTheme} />
				<Routes>
					<Route path='/' element={<Cards />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/my-cards' element={<MyCards />} />
					<Route path='/favorite-cards' element={<FavoriteCards />} />
					<Route path='/sandbox' element={<Sandbox />} />
					<Route path='/user-details/:userId' element={<UserDetailes />} />
					<Route path='/card-details/:card_Id' element={<CardDetails />} />
					<Route path='/update-card/:cardId' element={<UpdateCard />} />
					<Route path='/update-user/:userId' element={<UpdateUser />} />
					<Route path='/about' element={<About />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</Router>
		</SiteTheme.Provider>
	);
}

export default App;
