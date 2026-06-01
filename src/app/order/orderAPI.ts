import { eq, sql } from "drizzle-orm"; // 🌟 Tambahkan 'sql' di sini
import db from "../../db";
import { menu, order } from "../../db/schema"
import type { Request, Response } from 'express';

export const getAllOrder = async (req: Request, res: Response) => { 
    try {
        const data = await db.select().from(order);
        res.json({
            success: true,
            message: "Success to fetch order",
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

export const createOrder = async (req: Request, res: Response) => { 
    try {
        // KITA BUANG 'id: 0' BAWAAN DARI MAUI
        const { id, ...dataPesanan } = req.body;

        const [insertResult] = await db.insert(order).values(dataPesanan);
        
        res.json({
            success: true,
            message: "Success to create order",
            data: [
                {
                    ...dataPesanan,               // Taruh data MAUI di atas
                    id: insertResult.insertId     // Taruh ID Database di Bawah agar tidak tertimpa!
                }
            ]
        });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error: " + e, data: [] });
    }
}

export const findOrderById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.select().from(order).where(eq(order.id,Number(id)))
        res.json({
            success: true,
            message: "Success to find order by id: " + id,
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

export const updateOrder = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        // PERBAIKAN: new Date menjadi new Date()
        const data = await db.update(order).set({...req.body, update_at: new Date()}).where(eq(order.id, Number(id)))
        res.json({
            success: true,
            message: "Success to update order",
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

export const deleteOrder = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.delete(order).where(eq(order.id,Number(id)))
        res.json({
            success: true,
            message: "Success to delete order " + id,
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

// 🌟 FUNGSI BARU: TOMBOL NUKLIR RESET DATA (DEV ONLY) 🌟
export const resetAllOrders = async (req: Request, res: Response): Promise<any> => {
    try {
        // Gembok Keamanan
        const sandiRahasia = req.headers['x-reset-password'];
        
        if (sandiRahasia !== "DeveloperGanteng123") {
            return res.status(403).json({ 
                success: false,
                message: "Akses Ditolak! Anda bukan developer.",
                data: []
            });
        }

        // Eksekusi Raw Query Drizzle untuk mematikan relasi sementara
        await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`); 
        
        // ⚠️ Kosongkan tabel (Gunakan backtick pada `order` karena ia keyword SQL)
        await db.execute(sql`TRUNCATE TABLE orderlist;`);   
        await db.execute(sql`TRUNCATE TABLE \`order\`;`);      
        
        // Nyalakan kembali relasi
        await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`); 
        
        res.json({ 
            success: true,
            message: "🔥 BOOM! Database bersih, ID kembali ke 1.",
            data: []
        });
    } catch (e) {
        // Wajib nyalakan kembali jika terjadi error agar database tidak terkunci
        await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);
        res.status(500).json({ 
            success: false,
            message: "Error: " + e, 
            data: [] 
        });
    }
}