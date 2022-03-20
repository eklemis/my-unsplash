import styles from "./header.module.css";
import Image from "next/image";

export default function Header(props) {
	function applyFilter(ev) {
		props.setFKeyword(ev.target.value);
	}
	return (
		<header className={styles.header}>
			<div className={styles["left-wrapper"]}>
				<Image
					src="/my_unsplash_logo.svg"
					className={styles.logo}
					alt="logo"
					width={138}
					height={26}
				/>
				<input
					type="text"
					placeholder="Search by name"
					className={styles["search-text"]}
					onChange={applyFilter}
				/>
			</div>
			<button className={styles.btn} onClick={props.showAddPhoto}>
				Add a photo
			</button>
		</header>
	);
}
