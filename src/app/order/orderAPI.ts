import { eq, sql } from "drizzle-orm"; 
import db from "../../db";
import { menu, orders } from "../../db/schema"
import type { Request, Response } from 'express';

export const getAllOrder = async (req: Request, res: Response) => { 
    try {
        const data = await db.select().from(orders);
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
        
        const { id, ...dataPesanan } = req.body;

        const [insertResult] = await db.insert(orders).values(dataPesanan);
        
        res.json({
            success: true,
            message: "Success to create order",
            data: [
                {
                    ...dataPesanan,               
                    id: insertResult.insertId     
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
        const data = await db.select().from(orders).where(eq(orders.id,Number(id)))
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

        const data = await db.update(orders).set({...req.body, update_at: new Date()}).where(eq(orders.id, Number(id)))
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
        const data = await db.delete(orders).where(eq(orders.id,Number(id)))
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

export const resetAllOrders = async (req: Request, res: Response): Promise<any> => {
    try {
        const sandiRahasia = req.headers['x-reset-password'];
        
        if (sandiRahasia !== "fana") {
            return res.status(403).json({ 
                success: false,
                message: "Akses Ditolak! Anda bukan developer.",
                data: []
            });
        }

        // Matikan pengecekan constraint agar bisa TRUNCATE
        await db.execute(sql`SET FOREIGN_KEY_CHECKS = 0;`); 

        // TRUNCATE tabel yang benar (orders, bukan order)
        await db.execute(sql`TRUNCATE TABLE orderlist;`); 
        await db.execute(sql`TRUNCATE TABLE orders;`);      

        // Aktifkan kembali pengecekan constraint
        await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`); 
        
        res.json({ 
            success: true,
            message: "🔥 BOOM! Database bersih, ID kembali ke 1.",
            data: []
        });
    } catch (e) {
        await db.execute(sql`SET FOREIGN_KEY_CHECKS = 1;`);
        res.status(500).json({ 
            success: false,
            message: "Error: " + e, 
            data: [] 
        });
    }
}
export const batalOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await db.update(orders)
            .set({ status: 'dibatalkan', update_at: new Date() })
            .where(eq(orders.id, Number(id)));

        res.json({
            success: true,
            message: `🔥 Order #${id} berhasil dibatalkan secara aman.`
        });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error: " + e });
    }
};