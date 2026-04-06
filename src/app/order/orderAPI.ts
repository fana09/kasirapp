import { eq } from "drizzle-orm";
import db from "../../db";
import { menu, order } from "../../db/schema"
import { Request, Response } from 'express';

export const getAllOrder = async (req: Request, res: Response) => { 
    try {
        const data = await db.select().from(order);
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
export const createOrder = async (req: Request, res: Response) => { 
    try {
        const data = await db.insert(order).values(req.body)
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
export const findOrderById = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.select().from(order).where(eq(order.id,Number(id)))
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
export const updateOrder = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.update(order).set({...req.body,update_at:new Date}).where(eq(order.id, Number(id)))
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
export const deleteOrder = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params
        const data = await db.delete(order).where(eq(order.id,Number(id)))
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