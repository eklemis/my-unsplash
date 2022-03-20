import styles from "./imagebox.module.css";
import Image from "next/image";

export default function ImageBox({ url, width, height, label }) {
	return (
		<div className={styles.box}>
			<Image src={url} width={width} height={height} alt={label} />
		</div>
	);
}
