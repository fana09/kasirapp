CREATE TABLE `kategoris` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(255) NOT NULL,
	`jenis` enum('makanan','minuman'),
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `kategoris_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `menu` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gambar` varchar(255),
	`nama` varchar(255) NOT NULL,
	`harga` int NOT NULL,
	`kategori_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `menu_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order` (
	`id` int AUTO_INCREMENT NOT NULL,
	`total` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `order_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orderlist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int NOT NULL,
	`menu_id` int NOT NULL,
	`jumlah` int NOT NULL,
	`total` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `orderlist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `menu` ADD CONSTRAINT `menu_kategori_id_kategoris_id_fk` FOREIGN KEY (`kategori_id`) REFERENCES `kategoris`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderlist` ADD CONSTRAINT `orderlist_order_id_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderlist` ADD CONSTRAINT `orderlist_menu_id_menu_id_fk` FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE no action ON UPDATE no action;