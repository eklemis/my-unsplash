import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Addphoto from "../components/addphoto";
import { getAllPhoto } from "../helpers/photo";
import { useState, useEffect } from "react";

export default function Home(props) {
	const [addingPhoto, setAddingPhoto] = useState(false);
	const [deletingPhoto, setDeletingPhoto] = useState(false);
	const [allPhoto, setAllPhoto] = useState(props.allPhotos);
	useEffect(() => {
		console.log(allPhoto);
	}, [allPhoto]);
	function showAddPhoto() {
		setAddingPhoto(true);
	}
	function cancelAddPhoto() {
		setAddingPhoto(false);
	}
	function showDeleteConfirmation() {
		setDeletingPhoto(true);
	}
	function cancelDelete() {
		setDeletingPhoto(false);
	}
	return (
		<>
			{addingPhoto && (
				<Addphoto cancelAddPhoto={cancelAddPhoto} setAllPhoto={setAllPhoto} />
			)}
			<div className={styles.container}>
				<Head>
					<title>My Unsplash</title>
					<meta name="description" content="Mini version unsplash" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header showAddPhoto={showAddPhoto} />
				<div className={styles.main}></div>
				<footer className={styles.footer}>
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered by{" "}
						<span className={styles.logo}>
							<Image
								src="/vercel.svg"
								alt="Vercel Logo"
								width={72}
								height={16}
							/>
						</span>
					</a>
				</footer>
			</div>
		</>
	);
}
export async function getStaticProps() {
	const data = await getAllPhoto();
	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			allPhotos: data,
		},
		revalidate: 10,
	};
}
