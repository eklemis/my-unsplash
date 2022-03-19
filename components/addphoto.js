import styles from "./addphoto.module.css";

export default function Addphoto(props) {
	let width, height;
	return (
		<div className={styles.wrapper}>
			<div className={styles.backdrop} />
			<form className={styles.form}>
				<h2 className={styles["form-title"]}>Add a new photo</h2>
				<label htmlFor="label">Label</label>
				<input type="text" id="label" name="label" />
				<label htmlFor="url">Photo URL</label>
				<input type="text" id="url" name="url" />
				<div className={styles["buttons-holder"]}>
					<button className={styles.btn} onClick={props.cancelAddPhoto}>
						Cancel
					</button>
					<input type="button" value="Submit" />
				</div>
			</form>
		</div>
	);
}
