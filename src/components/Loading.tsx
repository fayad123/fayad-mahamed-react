import {FunctionComponent, useContext} from "react";
import styles from "../../loading.module.css";
import { SiteTheme } from "../theme/theme";
interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
		const theme = useContext(SiteTheme);

	return (
		<main
			style={{backgroundColor: theme.background, color: theme.color}}
			className='min-vh-100 d-flex align-items-center justify-content-center'
		>
			<div className={styles.threeBody}>
				<div className={styles.threeBody__dot}></div>
				<div className={styles.threeBody__dot}></div>
				<div className={styles.threeBody__dot}></div>
			</div>
		</main>
	);
};

export default Loading;
