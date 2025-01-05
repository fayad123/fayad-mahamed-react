import {jwtDecode} from "jwt-decode";
import {
	Dispatch,
	FunctionComponent,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

interface ContextTypes {
	user_Id: string;
	isLogedin: boolean;
	isBusiness: boolean;
	isAdmin: boolean;
	setIsAdmin: Dispatch<SetStateAction<boolean>>;
	setUser_Id: Dispatch<SetStateAction<string>>;
	setIsBusiness: Dispatch<SetStateAction<boolean>>;
	setIsLogedin: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<ContextTypes | undefined>(undefined);

export const useAutherContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useAutherContext must be used within a UserProvider");
	}
	return context;
};

export const UserProvider: FunctionComponent<{children: ReactNode}> = ({children}) => {
	const [isBusiness, setIsBusiness] = useState<boolean>(false);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [isLogedin, setIsLogedin] = useState<boolean>(false);
	const [user_Id, setUser_Id] = useState<string>("");

	return (
		<UserContext.Provider
			value={{
				user_Id,
				isLogedin,
				isBusiness,
				isAdmin,
				setIsAdmin,
				setUser_Id,
				setIsBusiness,
				setIsLogedin,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
