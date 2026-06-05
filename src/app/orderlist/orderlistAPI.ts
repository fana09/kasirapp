import { eq, getTableColumns } from "drizzle-orm";
import db from "../../db";
import { menu, order, orderlist } from "../../db/schema"
import type { Request, Response } from 'express';

export const getAllorderlist = async (req: Request, res: Response) => { 
    try {
        const data = await db.select({
            ...getTableColumns(orderlist),
            order:{
                  total_order: order.total,
                  nama: order.nama,
                  status: order.status
            },
            menu: {
                gambar_menu : menu.gambar,
                nama_menu : menu.nama,
                harga_menu : menu.harga
            }
        })
        .from(orderlist)
        .innerJoin(order, eq(orderlist.order_id, order.id))
        .innerJoin(menu, eq(orderlist.menu_id, menu.id));
        
        res.json({
            success: true,
            message: "Success to fetch orderlist",
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

export const createorderlist = async (req: Request, res: Response) => { 
    try {
      
        const { id, ...detailPesanan } = req.body;

        const [insertResult] = await db.insert(orderlist).values(detailPesanan);
        
        res.json({
            success: true,
            message: "Success to create orderlist",
            data: [
                {
                    ...detailPesanan,
                    id: insertResult.insertId
                }
            ]
        });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error: " + e, data: [] });
    }
}

export const findorderlistById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.select().from(orderlist).where(eq(orderlist.id,Number(id)))
        
        res.json({
            success: true,
            message: "Success to find orderlist by id: " + id,
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

export const updateorderlist = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.update(orderlist).set({...req.body, update_at: new Date()}).where(eq(orderlist.id, Number(id)))
        
        res.json({
            success: true,
            message: "Success to update orderlist",
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

export const deleteorderlist = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.delete(orderlist).where(eq(orderlist.id,Number(id)))
        
        res.json({
            success: true,
            message: "Success to delete orderlist " + id,
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