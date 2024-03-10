import express, {Express, Request, Response} from "express";
import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient();
function routes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.send("We like to eat pizza.");
    });

    app.get("/api/champions", async (req: Request, res: Response) => {
        const champs = await prisma.champion.findMany();

   res.json(champs);
    })
}

export default routes;