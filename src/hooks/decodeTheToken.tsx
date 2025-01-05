import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";
import { useAutherContext } from "../context/userContext";

interface DecodedToken {
	exp: number;
	isAdmin: boolean;
	isBusiness: boolean;
	_id: string;
}

export const useToken = () => {
const{setIsLogedin,setIsBusiness,setUser_Id,setIsAdmin,isAdmin,isBusiness,isLogedin,user_Id}=useAutherContext()

	useEffect(() => {
		const storedToken = localStorage.getItem("token");

		if (storedToken) {
			try {
				const decoded = jwtDecode<DecodedToken>(storedToken);

				const currentTime = Math.floor(Date.now() / 1000);

				if (decoded.exp && decoded.exp < currentTime) {
					console.log("Token has expired");
					localStorage.removeItem("token");
					setIsAdmin(false);
					setIsBusiness(false);
					setIsLogedin(false);
					setUser_Id("");
				} else {
					setIsAdmin(decoded.isAdmin);
					setIsBusiness(decoded.isBusiness);
					setUser_Id(decoded._id);
					setIsLogedin(true);
				}
			} catch (error) {
				console.error("Error decoding token:", error);
				localStorage.removeItem("token");
				setIsAdmin(false);
				setIsBusiness(false);
				setIsLogedin(false);
				setUser_Id("");
			}
		} else {
			setIsAdmin(false);
			setIsBusiness(false);
			setIsLogedin(false);
			setUser_Id("");
			return
		}
	}, []);

	return {
		isAdmin,
		isBusiness,
		isLogedin,
		user_Id,
	};
};
