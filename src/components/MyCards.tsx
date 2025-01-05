import {FunctionComponent, useContext, useEffect, useState} from "react";
import {SiteTheme} from "../theme/theme";
import AddCardModal from "../services/AddCardModal";
import {Cards} from "../interfaces/cards";
import {deleteCardById, getMyCards} from "../services/cardsService";
import {useAutherContext} from "../context/userContext";
import Loading from "./Loading";
import {Link, useNavigate} from "react-router-dom";
import DeleteModal from "../services/DeleteModal";
import {errorMessage, successMessage} from "../services/toastify";
import DeleteAndEdit from "../assets/DeleteAndEdit";

interface MyCaedsProps {}

const MyCards: FunctionComponent<MyCaedsProps> = () => {
	const theme = useContext(SiteTheme);
	const {user_Id} = useAutherContext();
	const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
	const [cards, setCards] = useState<Cards[]>([]);
	const [isloading, setIsLoading] = useState<boolean>(true);
	const navTo = useNavigate();
	const [shoDeleteModal, setShoDeleteModal] = useState<boolean>(false);
	const [cardToDelete, setCardToDelete] = useState<string>("");

	const onSowDeleteModal = () => setShoDeleteModal(true);
	const onHideDeleteModal = () => setShoDeleteModal(false);
	const onShowAddCardModal = () => setShowAddCardModal(true);
	const onHideAddCardModal = () => setShowAddCardModal(false);

	useEffect(() => {
		getMyCards(user_Id).then((res) => {
			setCards(res?.data);
			setIsLoading(false);
		});
	}, []);

	const cardHandleDelete = (cardId: string) => {
		deleteCardById(cardId)
			.then(() => successMessage("card has ben deleted successfully"))
			.catch((err) => errorMessage(err));
	};

	if (isloading) return <Loading />;

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='main min-vh-100'
		>
			<h1 className='text-center display-5 pt-5'>My Business Cards</h1>
			<AddCardModal onHide={onHideAddCardModal} show={showAddCardModal} />
			<div className='container'>
				<button
					onClick={() => onShowAddCardModal()}
					className='btn bg-info-subtle d-block m-5 fw-bold'
				>
					Add New Card
				</button>

				<div className='row'>
					{cards.length ? (
						cards.map((card) => (
							<div
								className='col-sm-12 col-md-6 col-lg-4 mt-4'
								key={card._id}
							>
								<div
									style={{
										backgroundColor: theme.background,
										color: theme.color,
									}}
									className='card h-100 shadow'
								>
									<Link to={`/card-details/${card._id}`}>
										<img
											className=' card-img-top img-fluid'
											src={card.image.url}
											alt={card.image.alt}
										/>
									</Link>
									<div className='card-body'>
										<h5 className='card-title'>{card.title}</h5>
										<h5 className='card-title my-3'>
											{card.subtitle}
										</h5>
										<hr />
										<h5 className=' card-text lead my-3'>
											{card.description}
										</h5>
									</div>
									<div className='card-footer'>
										<DeleteAndEdit
											onKlickDelete={() => {
												setCardToDelete(card._id as string);
												onSowDeleteModal();
											}}
											onSowDeleteModal={onSowDeleteModal}
											onKlickEdit={() =>
												navTo(`/update-card/${card._id}`)
											}
											idForWhatToDelete={cardToDelete}
										/>
									</div>
									<hr />
									{}
								<button
									onClick={() => navTo(-1)}
									className='btn btn-dark rounded-5 w-25 m-3'
								>
									Back
								</button>
								</div>
							</div>
						))
					) : (
						<p className='text-danger text-center display-6'>
							YOU DON'T HAVE ANY CARD
						</p>
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

export default MyCards;
