import axios from "axios";
import {User} from "../interfaces/users";

export interface UserLogin {
	email: string;
	password: string;
}

const api: string = import.meta.env.VITE_APP_URL;

export const loginUser = async (login: UserLogin): Promise<any> => {
	try {
		const response = await axios.post(`${api}/users/login`, login);
		return response;
	} catch (error) {
		console.log("Login failed, please try again.", error);
	}
};

export const getAllUsers = async () => {
	let token: string | null = localStorage.getItem("token") || null;

	try {
		const users = await axios.get(`${api}/users`, {
			headers: {
				"x-auth-token": token,
			},
		});
		return users;
	} catch (error) {
		console.log(error);
	}
};

export const regiSterNewUser = async (newUser: User) => {
	try {
		const response = await axios.post(`${api}/users`, newUser);
		return response;
	} catch (error) {
		console.log("Login failed, please try again.", error);
	}
};

export const getUserById = async (userId: string) => {
	let token: string | null = localStorage.getItem("token") || null;
	try {
		const user = await axios.get(`${api}/users/${userId}`, {
			headers: {
				"x-auth-token": token,
			},
		});
		return user;
	} catch (error) {
		console.log(error);
	}
};

export const updateUser = async (userId: string, values: User) => {
	let token: string | null = localStorage.getItem("token") || null;
	try {
		const user = await axios.put(`${api}/users/${userId}`, values, {
			headers: {
				"x-auth-token": token,
			},
		});
		return user.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = async (userId: string) => {
	let token: string | null = localStorage.getItem("token") || null;
	const deletedUser = await axios.delete(`${api}/users/${userId}`, {
		headers: {
			"x-auth-token": token,
		},
	});
	return deletedUser.data;
};
