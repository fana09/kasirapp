import { sql, Table } from 'drizzle-orm';
import { datetime, foreignKey, int, mysqlEnum, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

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
)


export const order = mysqlTable('order', {
    id: int().autoincrement().primaryKey(),
    total: int().notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    update_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
})

export const orderlist = mysqlTable('orderlist', {
    id: int().autoincrement().primaryKey(),
    order_id: int().notNull(),
    menu_id: int().notNull(),
    jumlah: int().notNull(),
    total: int().notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    update_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => ({
        order_fk: foreignKey({
            columns: [table.order_id],
            foreignColumns: [order.id]
        }),
        menu_fk: foreignKey({
            columns: [table.menu_id],
            foreignColumns: [menu.id]
        }),
    })
)
