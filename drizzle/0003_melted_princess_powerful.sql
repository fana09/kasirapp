CREATE TABLE `admin` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL DEFAULT 'admin',
	`password` varchar(255) NOT NULL,
	`pin` varchar(10) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
RENAME TABLE `order` TO `orders`;--> statement-breakpoint
ALTER TABLE `orderlist` DROP FOREIGN KEY `orderlist_order_id_order_id_fk`;
--> statement-breakpoint
ALTER TABLE `orderlist` DROP FOREIGN KEY `orderlist_menu_id_menu_id_fk`;
--> statement-breakpoint
ALTER TABLE `orders` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `orders` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `orderlist` ADD `catatan` varchar(255);--> statement-breakpoint
ALTER TABLE `orderlist` ADD CONSTRAINT `orderlist_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orderlist` ADD CONSTRAINT `orderlist_menu_id_menu_id_fk` FOREIGN KEY (`menu_id`) REFERENCES `menu`(`id`) ON DELETE cascade ON UPDATE no action;