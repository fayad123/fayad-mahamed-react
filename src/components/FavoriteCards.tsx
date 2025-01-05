import {FunctionComponent, useContext, useEffect, useState} from "react";
import {SiteTheme} from "../theme/theme";
import {getLikedCards, updateLike} from "../services/cardsService";
import {useAutherContext} from "../context/userContext";
import {Cards} from "../interfaces/cards";
import Loading from "./Loading";
import {useNavigate} from "react-router-dom";
import DeleteAndEdit from "../assets/DeleteAndEdit";
import DeleteModal from "../services/DeleteModal";
import {cardHandleDelete} from "../handles/cards";
import {useToken} from "../hooks/decodeTheToken";
import {errorMessage, successMessage} from "../services/toastify";

interface FavoriteCardsProps {}

const FavoriteCards: FunctionComponent<FavoriteCardsProps> = () => {
	const theme = useContext(SiteTheme);
	const {user_Id} = useToken();
	const {isAdmin, isLogedin} = useAutherContext();
	const [cards, setCards] = useState<Cards[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const navigateTo = useNavigate();
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<string>("");

	const onShowDeleteModal = () => setShowDeleteModal(true);
	const onHideDeleteModal = () => {
		setShowDeleteModal(false);
		setCardToDelete("");
	};

	useEffect(() => {
		if (!user_Id) return;
		try {
			getLikedCards(user_Id)
				.then((res) => {
					const liked = res.filter((card: any) => card.likes.includes(user_Id));
					setCards(liked.reverse());
					setIsLoading(false);
				})
				.catch(() => {
					errorMessage("Failed to fetch cards");
				});
		} catch (error) {
			console.log(error);
		}
	}, [user_Id]);

	const handleLikeToggle = (
		cardId: string,
		cards: Cards[],
		userId: string,
		cardsSetter: React.Dispatch<React.SetStateAction<Cards[]>>,
	) => {
		const updatedCards = cards.map((card: Cards) => {
			if (card._id === cardId) {
				const isLiked = card.likes?.includes(userId);

				if (isLiked) {
					card.likes = card.likes?.filter((id) => id !== userId);
				} else {
					card.likes?.push(userId);
				}

				updateLike(cardId, userId)
					.then((res) => console.log
					(res.data))
					.catch((err) => {
						console.log("Failed to update like status:", err);
						// هنا يمكننا اتخاذ إجراءات في حالة حدوث خطأ، مثل إظهار رسالة للمستخدم
					});
			}
			return {...card};
		});

		// تحديث حالة البطاقات في الواجهة بعد التغيير
		cardsSetter(updatedCards);
	};

	if (isLoading) return <Loading />;

	return (
		<main
			className='main min-vh-100'
			style={{backgroundColor: theme.background, color: theme.color}}
		>
			<div className='container m-auto p-5'>
				<h1 className='text-center display-5'>Favorite Cards</h1>
				<div className='row'>
					{cards.length ? (
						cards.map((card: Cards) => (
							<div
								key={card._id}
								className='col-sm-12 col-md-6 col-lg-4 mt-4'
							>
								<div
									className='card h-100 border-0'
									style={{
										maxWidth: "30rem",
										backgroundColor: theme.background,
										color: theme.color,
									}}
								>
									<img
										src={card.image.url}
										alt={card.image.alt}
										className='img-fluid'
									/>
									<div className='card-body'>
										<h5 className='card-title my-3'>{card.title}</h5>
										<h6 className='card-subtitle'>{card.subtitle}</h6>
										<h6 className='card-text'>{card.description}</h6>
										<div>
											<input
												id={card._id}
												type='checkbox'
												checked={card.likes?.includes(user_Id)}
												className='fs-4 m-auto w-25 d-none'
												onChange={() =>
													handleLikeToggle(
														card._id as string,
														cards,
														user_Id,
														setCards,
													)
												}
											/>
											<label htmlFor={card._id}>
												<i
													className={`fa-regular fa-thumbs-up my-3 fs-3 ${
														card.likes?.includes(user_Id) &&
														"text-danger"
													}`}
												></i>
												<h5
													className={`${
														card.likes?.includes(user_Id) &&
														"text-danger"
													}`}
												>
													{card.likes?.length}
												</h5>
											</label>
										</div>
									</div>
									<div className='card-footer'>
										{isLogedin &&
											(isAdmin ||
												card.user_id?.includes(user_Id)) && (
												<>
													<hr />
													<DeleteAndEdit
														onKlickDelete={() => {
															setCardToDelete(
																card._id as string,
															);
															onShowDeleteModal();
														}}
														onKlickEdit={() =>
															navigateTo(
																`/update-card/${card._id}`,
															)
														}
														onSowDeleteModal={
															onShowDeleteModal
														}
														idForWhatToDelete={
															card._id as string
														}
													/>
												</>
											)}
									</div>
								</div>
							</div>
						))
					) : (
						<p>ghj</p>
					)}
				</div>
			</div>
			<DeleteModal
				deleteTitle='Card'
				handleClose={onHideDeleteModal}
				show={showDeleteModal}
				toDelete={() => cardHandleDelete(cardToDelete)}
			/>
		</main>
	);
};

export default FavoriteCards;
