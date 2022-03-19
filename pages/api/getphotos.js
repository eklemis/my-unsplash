import { getAllPhoto } from "../../helpers/photo";

export default async function handler(req, res) {
	const photos = await getAllPhoto();
	res.status(200).json(photos);
}
