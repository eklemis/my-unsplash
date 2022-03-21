import styles from "./delphoto.module.css";
import { useState } from "react";
import { useEffect } from "react";

export default function Delphoto(props) {
	const [delData, setDelData] = useState({
		id: props.id,
		delpass: "",
	});
	async function submitHandler(event) {
		event.preventDefault();
		props.setDelId(props.id);
		props.submitDelete(delData);
	}
	function cancelHandler() {
		setDelData({
			id: props.id,
			delpass: "",
		});
		props.setDelId("");
		props.cancelDelete();
	}
	function passChange(ev) {
		setDelData({ ...delData, delpass: ev.target.value });
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.backdrop} />
			<form className={styles.form} onSubmit={submitHandler}>
				<h2 className={styles["form-title"]}>Are you sure?</h2>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={delData.delpass}
					onChange={passChange}
				/>
				<div className={styles["buttons-holder"]}>
					<button className={styles.btn} onClick={cancelHandler}>
						Cancel
					</button>
					<input type="submit" value="Delete" onClick={submitHandler} />
				</div>
			</form>
		</div>
	);
}
