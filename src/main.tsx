import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App";
import {UserProvider} from "./context/userContext";
import {StrictMode} from "react";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</StrictMode>,
);
