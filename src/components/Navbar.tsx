import { FunctionComponent, useContext, useEffect, useId} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useAutherContext} from "../context/userContext";
import {SiteTheme} from "../theme/theme";

interface NavbarProps {
	darkModeButton: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({darkModeButton}) => {
	// const [search, setSearchQuery] = useState("");
	const {setIsAdmin, setIsLogedin, setIsBusiness, setUser_Id, isBusiness,isAdmin,isLogedin,user_Id} =
		useAutherContext();
	const navigate = useNavigate();
	const theme = useContext(SiteTheme);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			// Set authentication state based on token data
			setIsLogedin(true);
			const decoded = JSON.parse(atob(token.split(".")[1])); // Decoding the JWT token
			setIsAdmin(decoded.isAdmin);
			setIsBusiness(decoded.isBusiness);
			setUser_Id(decoded.userId);
		} else {
			setIsLogedin(false);
			setIsAdmin(false);
			setIsBusiness(false);
			setUser_Id("");
		}
	}, [user_Id]);


	const logout = () => {
		localStorage.removeItem("token");
		setIsAdmin(false);
		setIsBusiness(false);
		setIsLogedin(false);
		setUser_Id("");
		navigate("/");
	};

	// const handleSearchSubmit = (e: FormEvent) => {
	// 	e.preventDefault();
	// 	console.log("Searching for:", search);
	// };

	return (
		<nav className='navbar navbar-expand-lg bg-success-subtle sticky-top'>
			<div className='container-fluid'>
				<NavLink className='navbar-brand fw-bold px-2' to='/'>
					<i className='fa-solid fa-b fs-1'></i>
					<i className='fa-brands text-danger fw-bold'>Cards</i>
				</NavLink>
				<button
					style={{backgroundColor: theme.background, color: theme.color}}
					className='btn btn-outline-dark'
					onClick={() => darkModeButton()}
				>
					<i className='fa-solid fa-moon'></i>
				</button>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarSupportedContent'
					aria-controls='navbarSupportedContent'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0 fw-bold'>
						<li className='nav-item'>
							<NavLink className='nav-link' aria-current='page' to='/'>
								<i className='fa-solid fa-house'> Home</i>
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' aria-current='page' to='/about'>
								<i className='fa-solid fa-circle-info text-info'>_</i>
								About
							</NavLink>
						</li>
						{isLogedin && (
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/favorite-cards'
								>
									<i
										className='fa-solid fa-bookmark '
										style={{color: "#FFD43B"}}
									>
										_
									</i>
									favorite Cards
								</NavLink>
							</li>
						)}
						{isBusiness && (
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/my-cards'
								>
									<i className='fa-solid fa-id-card text-primary'>_</i>
									My Cards
								</NavLink>
							</li>
						)}
						{isAdmin && (
							<li className='nav-item'>
								<NavLink
									className='nav-link'
									aria-current='page'
									to='/sandbox'
								>
									<i className='fa-solid fa-toolbox text-danger'>_</i>
									Sandbox
								</NavLink>
							</li>
						)}
					</ul>
					{/* <form onSubmit={handleSearchSubmit} className='d-flex' role='search'>
						<input
							className='form-control me-2'
							type='search'
							placeholder='Search'
							onChange={(e) => setSearchQuery(e.target.value)}
							aria-label='Search'
						/>
						<button className='btn btn-outline-success' type='submit'>
							Search
						</button>
					</form> */}
					{isLogedin ? (
						<div className='nav-item'>
							<button
								onClick={logout}
								className='btn btn-outline-danger fw-bold'
								aria-current='page'
							>
								<i className='fa-duotone fa-solid fa-right-from-bracket '></i>
								Log out
							</button>
						</div>
					) : (
						<div className='d-flex'>
							<NavLink
								className='mx-2 login nav-link text-primary fw-bold'
								aria-current='page'
								to='/register'
							>
								| Register
							</NavLink>
							<NavLink
								className='login nav-link text-primary fw-bold'
								aria-current='page'
								to='/login'
							>
								Login
							</NavLink>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
