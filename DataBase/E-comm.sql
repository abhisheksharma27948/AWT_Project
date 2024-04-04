CREATE TABLE `shops` (
  `shop_id` integer PRIMARY KEY,
  `shop_name` varchar(255),
  `shop_owner` varchar(255),
  `address` varchar(255),
  `city` varchar(255),
  `state` varchar(255),
  `country` varchar(255),
  `pincode` varchar(255),
  `created_at` timestamp
);

CREATE TABLE `shopkeepers` (
  `shopkeeper_id` integer PRIMARY KEY,
  `shopkeeper_name` varchar(255),
  `shopkeeper_email` varchar(255),
  `shopkeeper_password` varchar(255),
  `phone_number` varchar(255),
  `shopkeeper_status` enum(approved,pending,suspended) DEFAULT 'pending',
  `shop_id` integer,
  `created_at` timestamp
);

CREATE TABLE `categories` (
  `category_id` integer PRIMARY KEY,
  `category_name` varchar(255),
  `shop_id` integer
);

CREATE TABLE `products` (
  `product_id` integer PRIMARY KEY,
  `product_name` varchar(255),
  `product_description` text,
  `product_price` decimal(10,2),
  `discount` decimal(5,2) DEFAULT 0,
  `category_id` integer,
  `shop_id` integer,
  `product_image` image,
  `created_at` timestamp
);

CREATE TABLE `product_variants` (
  `variant_id` integer PRIMARY KEY,
  `variant_name` varchar(255),
  `variant_price` decimal(10,2),
  `product_id` integer,
  `product_variants_image` image
);

CREATE TABLE `reviews` (
  `review_id` integer PRIMARY KEY,
  `user_id` integer,
  `product_id` integer,
  `rating` integer,
  `review_text` text
);

CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY,
  `username` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `status` enum(active,inactive) DEFAULT 'active',
  `role` enum(admin,customer,shopkeeper) DEFAULT 'customer'
);

ALTER TABLE `shopkeepers` ADD FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`);

ALTER TABLE `categories` ADD FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

ALTER TABLE `products` ADD FOREIGN KEY (`shop_id`) REFERENCES `shops` (`shop_id`);

ALTER TABLE `product_variants` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
