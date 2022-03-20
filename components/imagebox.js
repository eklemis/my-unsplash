import styles from "./imagebox.module.css";
import Image from "next/image";

export default function ImageBox({
	url,
	width,
	height,
	label,
	setDeletingPhoto,
}) {
	function showDeleteConfirm() {
		setDeletingPhoto(true);
	}
	return (
		<div className={styles.box}>
			<Image src={url} width={width} height={height} alt={label} />
			<button className={styles.btn} onClick={showDeleteConfirm}>
				delete
			</button>
			<h3 className={styles.label}>{label}</h3>
		</div>
	);
}
