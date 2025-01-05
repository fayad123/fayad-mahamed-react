import {FunctionComponent, useContext, useEffect, useState} from "react";
import {Cards} from "../interfaces/cards";
import {getCards, updateLike} from "../services/cardsService";
import Loading from "./Loading";
import DeleteModal from "../services/DeleteModal";
import {SiteTheme} from "../theme/theme";
import {Link, useNavigate} from "react-router-dom";
import {errorMessage, successMessage} from "../services/toastify";
import DeleteAndEdit from "../assets/DeleteAndEdit";
import {cardHandleDelete} from "../handles/cards";
import {useToken} from "../hooks/decodeTheToken";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const {user_Id, isAdmin, isLogedin} = useToken();
	const theme = useContext(SiteTheme);
	const [isloading, setIsLoading] = useState<boolean>(true);
	const [cards, setCards] = useState<Cards[]>([]);
	const navigate = useNavigate();
	const [shoDeleteModal, setShoDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<string>("");

	const onSowDeleteModal = () => setShoDeleteModal(true);
	const onHideDeleteModal = () => setShoDeleteModal(false);

	useEffect(() => {
		try {
			getCards()
				.then((res) => {
					setCards(res?.data.reverse());
					setIsLoading(false);
				})
				.catch((error) => {
					console.log(error);
					errorMessage("Failed to load cards. Please try again.");
				});
		} catch (error) {
			console.log(error);
			errorMessage("Something went wrong. Please try again.");
			setIsLoading(false);
		}
	}, []);

	const handleLikeToggle = (cardId: string) => {
		const updatedCards = cards.map((card: Cards) => {
			if (card._id === cardId) {
				const isLiked = card.likes?.includes(user_Id);

				if (isLiked) {
					card.likes = card.likes?.filter((id) => id !== user_Id);
					console.log(user_Id);
				} else {
					// Add like
					card.likes?.push(user_Id)
					successMessage(`you are liked ${card.email} card\n`);
				}

				// Update like status on the server
				updateLike(cardId, user_Id)
			}
			return card;
		});
		setCards(updatedCards);
	};

	if (isloading) return <Loading />;

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100 pt-5'
		>
			<div className='container m-auto p-5'>
				<h1 className='text-center'>Home</h1>
				<div className='row'>
					{!cards.length ? (
						<div>No cards available</div>
					) : (
						cards.map((card) => (
							<div
								className='col-sm-12 col-md-6 col-lg-4 mt-4 my-3'
								key={card._id}
							>
								<div
									className='card h-100 border-0 shadow rounded rounded-5'
									style={{
										maxWidth: "30rem",
										color: theme.color,
									}}
								>
									<Link to={`/card-details/${card._id}`}>
										<div className='card-img'>
											<img
												className='img-fluid'
												src={card.image.url}
												alt={card.image.alt}
											/>
										</div>
									</Link>

									<div className='card-body'>
										<h5 className='card-title my-3'>{card.title}</h5>
										<h6 className='card-subtitle'>{card.subtitle}</h6>
										<h6 className='card-text'>{card.description}</h6>
										<hr />
										<h6 className='card-text'>{card.email}</h6>
										{isLogedin && (
											<>
												<input
													key={card._id}
													id={card._id}
													type='checkbox'
													checked={card.likes?.includes(
														user_Id,
													)}
													className='fs-4 m-auto w-25 d-none'
													onChange={() =>
														handleLikeToggle(
															card._id as string,
														)
													}
												/>
												<label htmlFor={card._id}>
													<i
														className={`${
															card.likes?.includes(user_Id)
																? "text-danger"
																: "text-muted"
														} fa-regular fa-thumbs-up my-3 fs-3`}
														aria-label={
															card.likes?.includes(user_Id)
																? "Unlike"
																: "Like"
														}
													></i>
													<h5
														className={`${
															card.likes?.includes(user_Id)
																? "text-danger"
																: "text-muted"
														} fs-3`}
													>
														{card.likes?.length}
													</h5>
												</label>
											</>
										)}

										{(isLogedin && isAdmin) ||
										card.user_id === user_Id ? (
											<DeleteAndEdit
												onKlickDelete={() => {
													setCardToDelete(card._id as string);
													onSowDeleteModal();
												}}
												onSowDeleteModal={onSowDeleteModal}
												onKlickEdit={() =>
													navigate(`/update-card/${card._id}`)
												}
												idForWhatToDelete={cardToDelete}
											/>
										) : null}
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</div>
			<DeleteModal
				deleteTitle='Card'
				handleClose={onHideDeleteModal}
				show={shoDeleteModal}
				toDelete={() => cardHandleDelete(cardToDelete)}
			/>
		</main>
	);
};

export default Home;
