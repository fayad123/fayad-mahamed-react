import {FunctionComponent, useContext} from "react";
import styles from "../../pageNotFound.module.css";
import {SiteTheme} from "../theme/theme";
import { useNavigate} from "react-router-dom";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
	const theme = useContext(SiteTheme);
	const navTo = useNavigate();
	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100 d-flex justify-content-center align-items-center'
		>
			<div className='container text-center'>
				<div className='row'>
					<div className='col-md-6 mx-auto'>
						<div className={styles.errorWrapper}>
							<h1 className='display-1 text-danger'>404</h1>
							<h3
								style={{
									backgroundColor: theme.background,
									color: theme.color,
								}}
								className='mb-4'
							>
								Oops! Page Not Found
							</h3>
							<p
								style={{
									backgroundColor: theme.background,
									color: theme.color,
								}}
								className='mb-5 lead'
							>
								The page you're looking for doesn't exist or has been
								moved.
							</p>
							<button
								style={{
									backgroundColor: theme.background,
									color: theme.color,
								}}
								onClick={() => navTo(-1)}
								className='btn btn-md bg-info-subtle text-black m-5 fw-bold'
							>
								Go Back one step
							</button>
							<button
								style={{
									backgroundColor: theme.background,
									color: theme.color,
								}}
								onClick={() => navTo("/")}
								className='btn btn-sm bg-info-subtle text-black m-5 fw-bold'
							>
								Go Back To Home
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default PageNotFound;
