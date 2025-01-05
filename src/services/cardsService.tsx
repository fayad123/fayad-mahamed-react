import axios from "axios";
import {Cards} from "../interfaces/cards";
import {errorMessage} from "./toastify";

const api: string = import.meta.env.VITE_APP_URL;

export async function getCards() {
	try {
		const response = await axios.get(`${api}/cards`);
		return response;
	} catch (error) {
		console.log(error);
	}
}

export async function getCardById(cardId: string) {
	try {
		const response = await axios.get(`${api}/cards/${cardId}`);
		return response;
	} catch (error) {
		console.log(error);
	}
}

export async function getMyCards(cardId: string) {
	let token: string | null = localStorage.getItem("token") || null;

	try {
		const response = await axios.get(`${api}/cards/my-cards?user_id=${cardId}`, {
			headers: {
				"x-auth-token": token,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
}

export const updateCard = async (cardId: string, cardData: Cards) => {
	let token: string | null = localStorage.getItem("token") || null;

	try {
		const response = await axios.put(`${api}/cards/${cardId}`, cardData, {
			headers: {
				"x-auth-token": token,
			},
		});
		return response.data;
	} catch (err) {
		console.error("Error updating card:", err);
	}
};

export async function getLikedCards(userId: string) {
	try {
		const response = await axios.get(`${api}/cards?likes=${userId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}

export async function putCardById(cardId: string) {
	try {
		const response = axios.put(`${api}/cards/${cardId}`);
		return response;
	} catch (error) {
		console.log(error);
	}
}

export async function deleteCardById(cardId: string) {
	let token: string | null = localStorage.getItem("token") || null;

	try {
		const response = await axios.delete(`${api}/cards/${cardId}`, {
			headers: {
				"x-auth-token": token,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
}


export const updateLike = async (card_id: string, user_id: string) => {
	let token: string | null = localStorage.getItem("token") || null;

	try {
		const response = await axios.patch(
			`${api}/cards/${card_id}`,
			{likes: user_id},
			{
				maxBodyLength: Infinity,
				headers: {
					"x-auth-token": token,
				}
			
			},
		);

		return response;
	} catch (error) {
		console.error("Error updating like:", error);
		throw error;
	}
};

export async function AddNewBusinessCard(card: Cards) {
	let token: string | null = localStorage.getItem("token") || null;
	try {
		const response = await axios.post(`${api}/cards`, card, {
			headers: {
				"x-auth-token": token,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error adding new business card:", error);
	}
}
