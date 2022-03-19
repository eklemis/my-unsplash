import styles from "./addphoto.module.css";
import validator from "validator";
import { useState } from "react";
import { useEffect } from "react";

export default function Addphoto(props) {
	const [inputData, setInputData] = useState({
		label: "",
		url: "",
		width: "",
		height: "",
		userId: 1,
	});

	const [urlInvalid, setUrlInvalid] = useState();
	const [urlNoImage, setUrlNoImage] = useState();
	useEffect(() => {
		const img = new Image();
		img.src = inputData.url;
		const loadImage = (event) => {
			setInputData({ ...inputData, width: img.width, height: img.height });
		};
		img.addEventListener("load", loadImage, true);
		return () => {
			img.removeEventListener("load", loadImage, true);
		};
	}, [inputData, urlNoImage]);
	function labelChange(event) {
		setInputData({
			...inputData,
			label: event.target.value,
		});
	}
	function urlChange(event) {
		setInputData({
			...inputData,
			url: event.target.value,
		});
	}
	function submitHandler(event) {
		event.preventDefault();
		if (validator.isURL(inputData.url)) {
			setUrlInvalid(false);
			if (inputData.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
				setUrlInvalid(false);
				console.log(inputData);
				props.cancelAddPhoto();
			} else {
				setUrlNoImage(true);
			}
		} else {
			setUrlInvalid(true);
		}
	}
	function cancelHandler() {
		setInputData({
			label: "",
			url: "",
			width: "",
			height: "",
			userId: 1,
		});
		props.cancelAddPhoto();
	}
	return (
		<div className={styles.wrapper}>
			<div className={styles.backdrop} />
			<form className={styles.form} onSubmit={submitHandler}>
				<h2 className={styles["form-title"]}>Add a new photo</h2>
				<label htmlFor="label">Label</label>
				<input
					type="text"
					id="label"
					name="label"
					value={inputData.label}
					onChange={labelChange}
				/>
				<label htmlFor="url">Photo URL</label>
				<input
					type="text"
					id="url"
					name="url"
					value={inputData.url}
					onChange={urlChange}
				/>
				<div className={styles["buttons-holder"]}>
					<button className={styles.btn} onClick={cancelHandler}>
						Cancel
					</button>
					<input type="button" value="Submit" onClick={submitHandler} />
				</div>
				{urlInvalid && <span>Url invalid</span>}
				{urlNoImage && <span>Url is not of a direct image file</span>}
			</form>
		</div>
	);
}
