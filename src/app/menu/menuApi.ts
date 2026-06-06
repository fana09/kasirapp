import { eq, getTableColumns } from "drizzle-orm";
import db from "../../db";
import { kategori, menu } from "../../db/schema";
import type { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary dari Environment Variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// --- AMBIL SEMUA MENU ---
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

        res.json({ success: true, message: "Success to fetch menu", data: data });
    } catch (e) {
        res.status(500).json({ success: false, message: e instanceof Error ? e.message : e });
    }
};

// --- BUAT MENU BARU ---
export const createMenu = async (req: Request, res: Response) => { 
    try {
        let imageUrl = null;
        if (req.file) {
            // Upload ke Cloudinary dan ambil URL permanen
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
        }

        const insertData = {
            ...req.body,
            harga: Number(req.body.harga),
            kategori_id: Number(req.body.kategori_id),
            gambar: imageUrl 
        };

        await db.insert(menu).values(insertData);
        res.json({ success: true, message: "Success to create menu" });
    } catch (e) {
        res.status(500).json({ success: false, message: e instanceof Error ? e.message : e });
    }
};

// --- CARI MENU BY ID ---
export const findMenuById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const menuId = Number(id);

        if (isNaN(menuId)) return res.status(400).json({ success: false, message: "ID tidak valid" });

        const [data] = await db.select().from(menu).where(eq(menu.id, menuId)).limit(1);

        if (!data) return res.status(404).json({ success: false, message: "Menu tidak ditemukan" });

        res.json({ success: true, message: "Success to find menu", data: data });
    } catch (e) {
        res.status(500).json({ success: false, message: e instanceof Error ? e.message : e });
    }
};

// --- UPDATE MENU ---
export const updateMenu = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const [targetMenu] = await db.select().from(menu).where(eq(menu.id, Number(id))).limit(1);
        
        if (!targetMenu) return res.status(404).json({ success: false, message: "Menu tidak ditemukan" });

        let updateData: any = { ...req.body, update_at: new Date() };
        if (req.body.harga) updateData.harga = Number(req.body.harga);
        if (req.body.kategori_id) updateData.kategori_id = Number(req.body.kategori_id);

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updateData.gambar = result.secure_url;
        }

        await db.update(menu).set(updateData).where(eq(menu.id, Number(id)));
        res.json({ success: true, message: "Success to update menu" });
    } catch (e) {
        res.status(500).json({ success: false, message: e instanceof Error ? e.message : e });
    }
};

// --- DELETE MENU ---
export const deleteMenu = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        await db.delete(menu).where(eq(menu.id, Number(id)));
        res.json({ success: true, message: "Success to delete menu " + id });
} catch (e) {
    res.status(500).json({ 
        success: false, 
        message: e instanceof Error ? e.message : String(e) 
    });
}
};