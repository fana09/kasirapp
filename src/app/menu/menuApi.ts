import { eq } from "drizzle-orm";
import db from "../../db";
import { menu } from "../../db/schema"
import { Request, Response } from 'express';

export const getAllMenu = async (req: Request, res: Response) => { 
    try {
        const data = await db.select().from(menu);
        res.json({
            success: true,
            message: "Success to fetch menu",
            data: data
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error: " + e,
            data: []
        });
    }
};
export const createMenu = async (req: Request, res: Response) => { 
    try {
        const data = await db.insert(menu).values(req.body)
        res.json({
            success: true,
            message: "Success to create menu",
            data: []
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error: " + e,
            data: []
        });
    }
}
export const findMenuById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.select().from(menu).where(eq(menu.id,Number(id)))
        res.json({
            success: true,
            message: "Success to find menu by id: "+id,
            data: data
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error: " + e,
            data: []
        });
    }
}