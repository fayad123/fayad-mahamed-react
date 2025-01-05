import {deleteCardById} from "../services/cardsService";
import {successMessage} from "../services/toastify";

export const cardHandleDelete = (cardId: string) => {
	deleteCardById(cardId)
		.then(() => successMessage("card has ben deleted successfully"))
		.catch((err) => console.log(err));
};
