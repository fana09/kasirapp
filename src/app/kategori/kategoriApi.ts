import type { Request, Response } from 'express';
import db from "../../db";
import { kategori } from "../../db/schema";
import { eq } from 'drizzle-orm';
import { datetime } from 'drizzle-orm/mysql-core';

export const getKategori = async (req: Request, res: Response) => { 
    try {
        const data = await db.select().from(kategori);
        res.json({
            success: true,
            message: "Success to fetch kategori",
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

export const createKategori = async (req: Request, res: Response) => { 
    try {
        const namaBaru = req.body.nama || req.body.Nama;
        const jenisBaru = req.body.jenis || req.body.Jenis;
        const data = await db.insert(kategori).values({
            nama: namaBaru,
            jenis: jenisBaru
        });

        res.json({
            success: true,
            message: "Success to create kategori",
            data: []
        });
    } catch (e) {
        console.log("Error Tambah Kategori:", e); 
        res.status(500).json({
            success: false,
            message: "Error: " + e,
            data: []
        });
    }
}

export const findKategoriById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.select().from(kategori).where(eq(kategori.id,Number(id)))
        res.json({
            success: true,
            message: "Success to find kategori by id: "+id,
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

export const updateKategori = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const namaUpdate = req.body.nama || req.body.Nama;
        const jenisUpdate = req.body.jenis || req.body.Jenis;

        const data = await db.update(kategori)
            .set({ 
                nama: namaUpdate,
                jenis: jenisUpdate,
                update_at: new Date() 
            })
            .where(eq(kategori.id, Number(id)));

        res.json({
            success: true,
            message: "Success to update kategori",
            data: []
        });
    } catch (e) {
        console.log("Error Update Kategori:", e);
        res.status(500).json({
            success: false,
            message: "Error: " + e,
            data: []
        });
    }
}
export const deleteKategori = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.delete(kategori).where(eq(kategori.id,Number(id)))
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