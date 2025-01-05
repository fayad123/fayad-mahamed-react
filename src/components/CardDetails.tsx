import {FunctionComponent, useContext, useEffect, useState} from "react";
import {SiteTheme} from "../theme/theme";
import {getCardById} from "../services/cardsService";
import {useNavigate, useParams} from "react-router-dom";
import {Cards} from "../interfaces/cards";
import Loading from "./Loading";

interface CardDetailsProps {}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
	const {card_Id} = useParams<{card_Id: string}>();
	const [card, setCard] = useState<Cards | null>(null);
	const theme = useContext(SiteTheme);
	const [isloading, setIsLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	useEffect(() => {
		try {
			getCardById(card_Id as string)
				.then((res) => {
					setCard(res?.data); // Update the state with the fetched card data
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.log(error);
		}
	}, [card_Id]); // Dependency on card_Id to reload data when the ID changes

	if (isloading) return <Loading />;

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100'
		>
			<div className='container m-auto pt-5 fw-bold'>
				<h1 className='text-center'>CardDetails</h1>
				<div className='card h-100 border-0 shadow rounded rounded-5'>
					{card?.image?.url && (
						<img
							className='img-fluid m-auto my-5'
							src={card?.image?.url}
							alt={card?.image?.alt || "Card image"}
						/>
					)}
					<div className='card-body'>
						<h5 className='card-title text-center'>
							{card?.title || "Card Title"}
						</h5>
						<p className='card-text lead my-3 text-center'>
							{card?.description || "No description available."}
						</p>

						<p className='card-text mt-5'>
							Phone: {card?.phone || "Not available"}
						</p>
						<p className='card-text'>
							Address: {card?.address.state || "Not available"},{" "}
							{card?.address?.city}
						</p>
						<p className='card-text fs-5'>Email: {card?.email}</p>
						<button
							onClick={() => navigate(-1)}
							className='btn btn-dark rounded-5'
						>
							Back
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CardDetails;
