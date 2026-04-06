import { eq, getTableColumns } from "drizzle-orm";
import db from "../../db";
import { menu, order, orderlist } from "../../db/schema"
import { Request, Response } from 'express';

export const getAllorderlist = async (req: Request, res: Response) => { 
    try {
        const data = await db.select({
            ...getTableColumns(orderlist),
            order:{
                  total_order: order.total
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
export const createorderlist = async (req: Request, res: Response) => { 
    try {
        const data = await db.insert(orderlist).values(req.body)
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
export const findorderlistById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.select().from(orderlist).where(eq(orderlist.id,Number(id)))
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
export const updateorderlist = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.update(orderlist).set({...req.body,update_at:new Date}).where(eq(orderlist.id, Number(id)))
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
export const deleteorderlist = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.delete(orderlist).where(eq(orderlist.id,Number(id)))
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