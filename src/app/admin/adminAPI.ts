import type { Request, Response } from 'express';
import db from "../../db"; 
import { admin } from '../../db/schema'; 
import { eq } from 'drizzle-orm';

// Tambahkan fungsi ini di adminAPI.ts
export const getKeamanan = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await db.select().from(admin).where(eq(admin.id, Number(id)));
        
        if (data.length > 0) {
            res.json({ success: true, data: data[0] });
        } else {
            res.status(404).json({ success: false, message: "Admin tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ success: false, message: "Error: " + e });
    }
}
export const updateKeamanan = async (req: Request, res: Response): Promise<any> => { 
    try {
        const { id } = req.params;
        const { password_baru, pin_baru } = req.body;

        // 1. Siapkan keranjang kosong untuk menampung data yang mau diubah
        const dataUpdate: any = { 
            update_at: new Date() 
        };

        // 2. Cek mana yang dikirim. Kalau ada isinya, masukkan ke keranjang
        if (password_baru && password_baru.trim() !== "") {
            dataUpdate.password = password_baru;
        }
        if (pin_baru && pin_baru.trim() !== "") {
            dataUpdate.pin = pin_baru;
        }

        // 3. Kalau keranjangnya cuma isi update_at (artinya dua-duanya kosong ditolak)
        if (!dataUpdate.password && !dataUpdate.pin) {
            return res.status(400).json({ success: false, message: "Minimal isi salah satu (Sandi atau PIN)." });
        }

        // 4. Update ke database sesuai isi keranjang yang ada
        await db.update(admin)
                .set(dataUpdate)
                .where(eq(admin.id, Number(id)));
        
        res.json({ success: true, message: "Pengaturan keamanan berhasil diperbarui!" });
    } catch (e) {
        res.status(500).json({ success: false, message: "Error: " + e });
    }
}