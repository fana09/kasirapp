import { sql } from 'drizzle-orm';
import { datetime, foreignKey, int, mysqlEnum, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const kategori = mysqlTable('kategoris', {
    id: int().autoincrement().primaryKey(),
    nama: varchar({ length: 255 }).notNull(),
    jenis: mysqlEnum('jenis', ["makanan", "minuman"]),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    update_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const menu = mysqlTable('menu', {
    id: int().autoincrement().primaryKey(),
    gambar: varchar({ length: 255 }),
    nama: varchar({ length: 255 }).notNull(),
    harga: int().notNull(),
    kategori_id: int().notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    update_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => ({
    kategori_fk: foreignKey({
        columns: [table.kategori_id],
        foreignColumns: [kategori.id]
    })
})
);

// Diubah menjadi 'orders' untuk menghindari reserved keyword MySQL
export const orders = mysqlTable('orders', { 
    id: int().autoincrement().primaryKey(),
    total: int().notNull(),
    nama: varchar('nama', { length: 255 }),
    status: varchar('status', { length: 50 }).default('selesai').notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    update_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const orderlist = mysqlTable('orderlist', {
    id: int().autoincrement().primaryKey(),
    order_id: int().notNull(),
    menu_id: int().notNull(),
    jumlah: int().notNull(),
    total: int().notNull(),
    catatan: varchar('catatan',{length: 255}),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    update_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => ({
    // Tambahkan onDelete: 'cascade' agar transaksi terhapus otomatis jika order induk dihapus
    order_fk: foreignKey({
        columns: [table.order_id],
        foreignColumns: [orders.id]
    }).onDelete('cascade'),
    // Tambahkan onDelete: 'cascade' agar orderlist ikut terhapus jika menu dihapus
    menu_fk: foreignKey({
        columns: [table.menu_id],
        foreignColumns: [menu.id]
    }).onDelete('cascade'),
})
);

export const admin = mysqlTable('admin', {
    id: int().autoincrement().primaryKey(),
    username: varchar('username', { length: 50 }).default('admin').notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    pin: varchar('pin', { length: 10 }).notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    update_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
});