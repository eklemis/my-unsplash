import { PrismaClient } from "@prisma/client";
import { getAllPhoto } from "../../helpers/photo";
import Jimp from "jimp/es";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const prisma = new PrismaClient();
		const jimage = await Jimp.read(req.body.url);
		const postingData = {
			url: req.body.url,
			width: jimage.bitmap.width,
			height: jimage.bitmap.height,
			userId: req.body.userId,
		};
		const post = await prisma.images.create({
			data: { ...postingData },
		});
		const data = await getAllPhoto();
		res.status(200).json(data);
	} else {
		res.status(404).json({ message: "Page not found" });
	}
}
