import {FunctionComponent, useContext} from "react";
import {SiteTheme} from "../theme/theme";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
	const theme = useContext(SiteTheme);

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='main min-vh-100'
		>
			<div className='container m-auto p-5'>
				{/* Title Section */}
				<h1 className='text-center'>About</h1>
				<p className='mt-4'>
					Welcome to our application! Here, we help users manage their cards,
					favorite items, and customize their experience.
				</p>
				<p>
					Whether you're looking to keep track of your personal items, share
					your favorite cards with others, or update your profile, this platform
					makes it easy to do so.
				</p>
				<p>
					Our team is committed to making your experience as seamless and
					enjoyable as possible. Stay tuned for more updates!
				</p>

				{/* Features Section */}
				<h2 className='mt-5'>Key Features</h2>
				<ul>
					<li>Manage your cards and view them easily</li>
					<li>Like and favorite cards to keep track of important ones</li>
					<li>Personalized user experience based on your preferences</li>
					<li>Edit and update your personal and card details</li>
					<li>Seamless navigation and user-friendly interface</li>
				</ul>

				{/* Team Section */}
				<h2 className='mt-5'>Meet the Team</h2>
				<div className='row'>
					<div className='col-md-4'>
						<div className='card'>
							<img
								src='https://images.unsplash.com/photo-1664575599618-8f6bd76fc670?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								className='card-img-top img-fluid'
								alt='Team Member'
							/>
							<div className='card-body'>
								<h5 className='card-title'>Jamila and Eva</h5>
								<p className='card-text'>Leading Developer</p>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='card'>
							<img
								src='https://images.unsplash.com/photo-1665686306574-1ace09918530?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								className='card-img-top img-fluid'
								alt='Team Member'
							/>
							<div className='card-body'>
								<h5 className='card-title'>Jane Smith</h5>
								<p className='card-text'>UI/UX Designer</p>
							</div>
						</div>
					</div>
					<div className='col-md-4'>
						<div className='card'>
							<img
								src='https://images.unsplash.com/photo-1511376979163-f804dff7ad7b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								className='card-img-top img-fluid'
								alt='Team Member'
							/>
							<div className='card-body'>
								<h5 className='card-title'>Mike Johnson</h5>
								<p className='card-text'>Backend Developer</p>
							</div>
						</div>
					</div>
				</div>

				{/* Contact Section */}
				<h2 className='mt-5'>Contact Us</h2>
				<p>
					If you have any questions or suggestions, feel free to reach out to
					us:
				</p>
				<p>
					Email: <a href='mailto:support@cardsapp.com'>support@cardsapp.com</a>
				</p>

				{/* Footer Section */}
				<footer className='mt-5'>
					<p className='text-center'>
						&copy; 2025 CardsApp. All rights reserved. |{" "}
						<a href='/about'>About</a> |{" "}
						<a href='/terms'>Terms & Conditions</a>
					</p>
				</footer>
			</div>
		</main>
	);
};

export default About;
