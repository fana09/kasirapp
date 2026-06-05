import { eq, getTableColumns } from "drizzle-orm";
import db from "../../db";
import { kategori, menu } from "../../db/schema"
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const uploadDir = './public/uploads';

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
            message: "Error: " + (e instanceof Error ? e.message : e),
            data: []
        });
    }
};

export const createMenu = async (req: Request, res: Response) => { 
    try {
        const namaFileGambar = req.file ? req.file.filename : null;

        const insertData = {
            ...req.body,
            harga: req.body.harga ? Number(req.body.harga) : undefined,
            kategori_id: req.body.kategori_id ? Number(req.body.kategori_id) : undefined,
            gambar: namaFileGambar
        };

        await db.insert(menu).values(insertData);
            res.json({
            success: true,
            message: "Success to create menu",
            data: []
        });
    } catch (e) {
        if (req.file) {
            const pathGambar = path.join(uploadDir, req.file.filename);
            if (fs.existsSync(pathGambar)) fs.unlinkSync(pathGambar);
        }

        res.status(500).json({
            success: false,
            message: "Error: " + (e instanceof Error ? e.message : e),
            data: []
        });
    }
}

export const findMenuById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.select().from(menu).where(eq(menu.id, Number(id)))
        res.json({
            success: true,
            message: "Success to find menu by id: " + id,
            data: data
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error: " + (e instanceof Error ? e.message : e),
            data: []
        });
    }
}
export const updateMenu = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const menuLama = await db.select().from(menu).where(eq(menu.id, Number(id))).limit(1);
        if (!menuLama || menuLama.length === 0) {
            if (req.file) {
                const pathGambarBaru = path.join(uploadDir, req.file.filename);
                if (fs.existsSync(pathGambarBaru)) fs.unlinkSync(pathGambarBaru);
            }
            return res.status(404).json({ success: false, message: "Menu tidak ditemukan", data: [] });
        }
        const targetMenu = menuLama[0];
        const updateData: any = {
            ...req.body,
            update_at: new Date()
        };
        if (req.body.harga) updateData.harga = Number(req.body.harga);
        if (req.body.kategori_id) updateData.kategori_id = Number(req.body.kategori_id);
        if (req.file) {
            updateData.gambar = req.file.filename;
            if (targetMenu?.gambar) {
                const pathGambarLama = path.join(uploadDir, targetMenu.gambar);
                if (fs.existsSync(pathGambarLama)) fs.unlinkSync(pathGambarLama);
            }
        }

        await db.update(menu).set(updateData).where(eq(menu.id, Number(id)));
     
        res.json({
            success: true,
            message: "Success to update menu",
            data: []
        });
    } catch (e) {
        if (req.file) {
            const pathGambarBaru = path.join(uploadDir, req.file.filename);
            if (fs.existsSync(pathGambarBaru)) fs.unlinkSync(pathGambarBaru);
        }

        res.status(500).json({
            success: false,
            message: "Error: " + (e instanceof Error ? e.message : e),
            data: []
        });
    }
}

export const deleteMenu = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const menuDihapus = await db.select().from(menu).where(eq(menu.id, Number(id))).limit(1);

        if (!menuDihapus || menuDihapus.length === 0) {
            return res.status(404).json({ success: false, message: "Menu tidak ditemukan", data: [] });
        }
        const targetMenu = menuDihapus[0];
        if (targetMenu?.gambar) {
            const pathGambar = path.join(uploadDir, targetMenu.gambar);
            if (fs.existsSync(pathGambar)) fs.unlinkSync(pathGambar);
        }
        await db.delete(menu).where(eq(menu.id, Number(id)));
        
        res.json({
            success: true,
            message: "Success to delete menu " + id,
            data: []
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Error: " + (e instanceof Error ? e.message : e),
            data: []
        });
    }
}