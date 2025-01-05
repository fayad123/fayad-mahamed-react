import {FunctionComponent, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {deleteUser, getUserById} from "../services/usersService";
import {User} from "../interfaces/users";
import {SiteTheme} from "../theme/theme";
import DeleteModal from "../services/DeleteModal";
import {successMessage} from "../services/toastify";

interface UserDetailesProps {}

const userValues = {
	name: {first: "", middle: "", last: ""},
	phone: "",
	email: "",
	password: "",
	image: {url: "", alt: ""},
	address: {city: "", street: "", state: "", country: "", zip: 0, houseNumber: 0},
};

const UserDetailes: FunctionComponent<UserDetailesProps> = () => {
	const {userId} = useParams<string>();
	const [user, setUser] = useState<User>(userValues);
	const theme = useContext(SiteTheme);
	const navTo = useNavigate();
	const [shoDeleteModal, setShoDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<string>("");

	const onSowDeleteModal = () => setShoDeleteModal(true);
	const onHideDeleteModal = () => setShoDeleteModal(false);

	useEffect(() => {
		getUserById(userId as string)
			.then((res) => setUser(res?.data))
			.catch((error) => console.log(error));
	}, []);

	const userHandleDelete = (cardId: string) => {
		deleteUser(cardId).then(() => successMessage(`successfully Deleted user_id: ${user._id}`));
	};

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100'
		>
			<div className='container m-auto pt-5 text-center'>
				<div className='card'>
					<img
						style={{width: "50%", height: "50%"}}
						className=' img-fluid m-auto my-5'
						src={user.image.url}
						alt={user.image.alt}
					/>
					<button
						type='button'
						style={{
							backgroundColor: theme.background,
							color: theme.color,
						}}
						onClick={() => navTo(-1)}
						className='btn btn-primary mt-3 w-25 mx-3'
					>
						Back
					</button>
					<div className='card-body'>
						{`${user.name.first} ${
							user.name.middle ? `${user.name.middle} ` : ""
						}${user.name.last}`}
						<hr />
						<h6 className='card-subtitle my-3'>{user.email}</h6>
						<strong>Role:</strong> {user.isAdmin ? "Admin" : "Client"}
					</div>
					<div className='d-flex my-4'>
						<div className=' w-50'>
							<button
								className=' btn btn-dark'
								onClick={() => navTo(`/update-user/${userId}`)}
							>
								<i className='fa-solid fa-pen text-warning'></i>
							</button>
						</div>
						<div className=' w-50'>
							<button
								onClick={() => {
									setCardToDelete(user._id as string);
									onSowDeleteModal();
								}}
								className='btn btn-dark'
							>
								<i className='fa-solid fa-trash-can text-danger'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<DeleteModal
				deleteTitle='User'
				handleClose={onHideDeleteModal}
				show={shoDeleteModal}
				toDelete={() => userHandleDelete(cardToDelete)}
			/>
		</main>
	);
};

export default UserDetailes;
