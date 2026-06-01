import { eq, getTableColumns } from "drizzle-orm";
import db from "../../db";
import { kategori, menu } from "../../db/schema"
import type { Request, Response } from 'express';

export const getAllMenu = async (req: Request, res: Response) => { 
    try {
        const data = await db.select({
            ...getTableColumns(menu),
            kategori: {
                nama_kategori : kategori.nama,
                jenis_kategori : kategori.jenis
            }

        })
        .from(menu)
        .innerJoin(kategori, eq(menu.kategori_id, kategori.id));

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
export const updateMenu = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.update(menu).set({...req.body,update_at:new Date}).where(eq(menu.id, Number(id)))
        res.json({
            success: true,
            message: "Success to update kategori",
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
export const deleteMenu = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.delete(menu).where(eq(menu.id,Number(id)))
        res.json({
            success: true,
            message: "Success to delete kategori "+id,
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