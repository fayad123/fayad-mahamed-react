import {FunctionComponent, useContext, useEffect, useState} from "react";
import {SiteTheme} from "../theme/theme";
import {getAllUsers} from "../services/usersService";
import {User} from "../interfaces/users";
import Loading from "./Loading";
import {Link, useNavigate} from "react-router-dom";

interface SandboxProps {}

const Sandbox: FunctionComponent<SandboxProps> = () => {
	const theme = useContext(SiteTheme);
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setIsLoading] = useState<boolean>(true);
	const navTo = useNavigate();

	useEffect(() => {
		getAllUsers().then((res) => {
			setUsers(res?.data);
			setIsLoading(false);
		});
	}, []);

	if (loading) return <Loading />;

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100'
		>
			<div className='container m-auto'>
				<h1 className='text-center'>Sandbox</h1>
				<div className='table-responsive'>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th colSpan={4}></th>
								<th colSpan={4}>Full Name</th>
								<th colSpan={4}>Email</th>
							</tr>
						</thead>
						<tbody>
							{users ? (
								users.map((user) => (
									<tr className='fw-bold' key={user._id}>
										<td
											style={{
												backgroundColor: theme.background,
												color: theme.color,
											}}
											colSpan={4}
										>
											<Link
												to={`/user-details/${user._id}`}
												className=''
											>
												<img
													style={{maxWidth: "200px"}}
													onMouseOver={(e) => {
														e.currentTarget.style.transform =
															"translateX(50px)";
														e.currentTarget.style.transition =
															"all 0.1s ease-in-out";
														e.currentTarget.style.scale =
															"1.3";
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.transform =
															"translateX(0px)";
														e.currentTarget.style.transition =
															"all 0.1s ease-in-out";
														e.currentTarget.style.scale = "1";
													}}
													className='img-fluid w-50 rounded-3  shadow'
													src={user.image.url}
													alt={user.image.alt}
												/>{" "}
											</Link>
											<button
												className=' btn btn-dark'
												onClick={() =>
													navTo(`/update-user/${user._id}`)
												}
											>
												<i className='fa-solid fa-pen text-warning'></i>
											</button>
										</td>
										<td
											style={{
												backgroundColor: theme.background,
												color: theme.color,
											}}
											colSpan={4}
										>
											{user.name.first} {user.name.last}
										</td>
										<td
											style={{
												backgroundColor: theme.background,
												color: theme.color,
											}}
											colSpan={4}
										>
											{user.email}
										</td>
									</tr>
								))
							) : (
								<p className=' text-danger'>No Users avalible</p>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
};

export default Sandbox;
