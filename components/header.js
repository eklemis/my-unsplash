import styles from "./header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles["left-wrapper"]}>
				<img src="/my_unsplash_logo.svg" className={styles.logo} />
				<input
					type="text"
					placeholder="Search by name"
					className={styles["search-text"]}
				/>
			</div>
			<button className={styles.btn}>Add a photo</button>
		</header>
	);
}
