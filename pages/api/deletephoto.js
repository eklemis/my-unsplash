import { PrismaClient } from "@prisma/client";
import { getAllPhoto } from "../../helpers/photo";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const prisma = new PrismaClient();
		const passwordCorrect = req.body.delpass === process.env.DELETE_PASSWORD;
		if (passwordCorrect) {
			const deletePhoto = await prisma.images.delete({
				where: {
					id: req.body.id,
				},
			});
			const data = await getAllPhoto();
			res.status(200).json({ message: "ok", data: data });
		} else {
			res.status(200).json({ message: "incorrect password" });
		}
	} else {
		res.status(404).json({ message: "Page not found" });
	}
}
