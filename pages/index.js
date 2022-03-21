import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import Addphoto from "../components/addphoto";
import Delphoto from "../components/delphoto";
import { getAllPhoto } from "../helpers/photo";
import { useState, useEffect } from "react";
import ImageBox from "../components/imagebox";
import Footer from "../components/footer";

export default function Home(props) {
	const [addingPhoto, setAddingPhoto] = useState(false);
	const [uploadingPhoto, setUploadingPhoto] = useState(false);
	const [deletingPhoto, setDeletingPhoto] = useState(false);
	const [delId, setDelId] = useState("");
	const [delStatus, setDelStatus] = useState("inactive");
	const [allPhoto, setAllPhoto] = useState(props.allPhotos);
	const [fKeyword, setFKeyword] = useState("");
	const [fRecords, setFRecords] = useState(props.allPhotos);
	const [window_width, setWindowWidth] = useState(0);
	useEffect(() => {
		window.addEventListener("resize", () => {
			setWindowWidth(window.innerWidth);
			console.log(window.innerWidth);
		});
	});

	useEffect(() => {
		const temp_all_photos = allPhoto.map((row) => {
			const formatedDate = new Date(row.createdAt);
			const newRow = { ...row, createdAt: formatedDate };
			return newRow;
		});
		temp_all_photos.sort((a, b) => b.createdAt - a.createdAt);
		if (fKeyword.trim() === "") {
			setFRecords(temp_all_photos);
		} else {
			setFRecords(
				temp_all_photos.filter((row) => row.label.includes(fKeyword.trim()))
			);
		}
	}, [allPhoto, fKeyword]);
	const images = fRecords.map((row, index) => {
		const standard_width = 360;
		let width = standard_width;
		const height = parseInt((row.height / row.width) * width);
		return (
			<ImageBox
				width={width}
				height={height}
				url={row.url}
				label={row.label}
				key={row.id}
				id={row.id}
				showDeleteConfirmation={showDeleteConfirmation}
				setDelId={setDelId}
				delId={delId}
				delStatus={delStatus}
				setDelStatus={setDelStatus}
			/>
		);
	});
	function addRow(newRow_) {
		setUploadingPhoto(true);
		var img = new Image();
		let row;
		img.onload = function () {
			row = { ...newRow_, width: this.width, height: this.height };
			const temp_all_photos = [row, ...allPhoto];
			setAllPhoto(temp_all_photos);
			setUploadingPhoto(false);
			fetch("/api/newphoto", {
				body: JSON.stringify({
					...row,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			})
				.then((res) => res.json())
				.then((data) => {
					setAllPhoto(data);
				});
		};
		img.src = newRow_.url;
	}
	function submitDelete(delRow_) {
		const delPhoto = async () => {
			const res = await fetch("/api/deletephoto", {
				body: JSON.stringify({
					...delRow_,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});

			const result = await res.json();
			if (result.message && result.message === "ok") {
				setAllPhoto(result.data);
				setDelStatus("success");
				console.log(allPhoto);
			} else if (result.message && result.message === "incorrect password") {
				setDelStatus("failed");
				console.log(result);
			}
		};
		delPhoto();
		setDeletingPhoto(false);
	}
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
				<Addphoto
					cancelAddPhoto={cancelAddPhoto}
					setAllPhoto={setAllPhoto}
					addRow={addRow}
				/>
			)}
			{deletingPhoto && (
				<Delphoto
					id={delId}
					setDelId={setDelId}
					cancelDelete={cancelDelete}
					submitDelete={submitDelete}
				/>
			)}
			<div className={styles.container}>
				<Head>
					<title>My Unsplash</title>
					<meta name="description" content="Mini version unsplash" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header showAddPhoto={showAddPhoto} setFKeyword={setFKeyword} />
				<div className={styles.main}>
					{uploadingPhoto && (
						<ImageBox
							id="new-upload"
							url="/Uploading.gif"
							width={360}
							height={280}
							label=""
						></ImageBox>
					)}
					{images}
				</div>
				<Footer />
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
