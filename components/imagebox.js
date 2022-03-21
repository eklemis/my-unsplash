import styles from "./imagebox.module.css";
import Image from "next/image";

export default function ImageBox({
	id,
	url,
	width,
	height,
	label,
	showDeleteConfirmation,
	setDelId,
	delId,
	delStatus,
	setDelStatus,
}) {
	const showDeletingMode = id === delId;
	const delSuccess = showDeletingMode && delStatus === "success";
	const delFailed = showDeletingMode && delStatus === "failed";
	if (delFailed) {
		setTimeout(() => {
			setDelStatus("inactive");
			setDelId("");
		}, 5000);
	}
	function showDeleteConfirm() {
		showDeleteConfirmation();
		setDelId(id);
	}
	return (
		<div className={styles.box}>
			<Image src={url} width={width} height={height} alt={label} />
			<button className={styles.btn} onClick={showDeleteConfirm}>
				delete
			</button>
			<h3 className={styles.label}>{label}</h3>
			{showDeletingMode && (
				<div className={styles.deleting}>
					{!delFailed && <p>Deleting this photo...</p>}
					{delFailed && (
						<div>
							<span>Delete failed: </span>
							<span>Incorect Deletion Password!</span>
						</div>
					)}
				</div>
			)}
			{id === "new-upload" && (
				<div className={styles.uploading}>
					<p>Uploading your photo...</p>
				</div>
			)}
		</div>
	);
}
