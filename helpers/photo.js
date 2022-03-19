import { PrismaClient } from "@prisma/client";
export async function getAllPhoto() {
	const prisma = new PrismaClient();
	const data = await prisma.images.findMany();
	return data;
}
