--Insert simulated data
--Insert categorical data 
INSERT INTO categories (category_name) VALUES
('Electronics'),
('Books'),
('Sports'),
('Food'),
('Fashion');

--Insert user data
INSERT INTO users (username, email, password_hash, role) VALUES
('alice', 'alice@example.com', 'hashed_password_1', 'user'),
('bob', 'bob@example.com', 'hashed_password_2', 'user'),
('admin', 'admin@example.com', 'hashed_password_admin', 'admin');

--Insert products data
INSERT INTO products (product_name, category_id, price, description, image_url, stock_quantity) VALUES
('iPhone 15', 1, 799.00, 'Latest Apple smartphone with advanced features', 'https://example.com/iphone15.jpg', 50),
('MacBook Pro', 1, 1999.00, 'Powerful laptop for developers and creators', 'https://example.com/macbookpro.jpg', 30),
('JavaScript Guide', 2, 39.00, 'Comprehensive guide to modern JavaScript', 'https://example.com/jsguide.jpg', 100),
('Clean Code', 2, 45.00, 'A handbook of agile software craftsmanship', 'https://example.com/cleancode.jpg', 80),
('Basketball', 3, 29.00, 'Professional indoor/outdoor basketball', 'https://example.com/basketball.jpg', 60),
('Running Shoes', 3, 99.00, 'Comfortable lightweight running shoes', 'https://example.com/runningshoes.jpg', 40),
('Coffee Beans', 4, 18.00, 'Premium roasted coffee beans', 'https://example.com/coffeebeans.jpg', 120),
('Green Tea', 4, 12.00, 'Organic green tea leaves', 'https://example.com/greentea.jpg', 90),
('Winter Jacket', 5, 129.00, 'Warm and stylish winter jacket', 'https://example.com/jacket.jpg', 25),
('Sneakers', 5, 89.00, 'Casual everyday sneakers', 'https://example.com/sneakers.jpg', 70);

--Insert Behavior test data
INSERT INTO user_events (user_id, product_id, event_type, event_value) VALUES
(1, 1, 'product_view', 'Viewed product detail'),
(1, 2, 'product_view', 'Viewed product detail'),
(1, 3, 'product_view', 'Viewed product detail'),
(2, 5, 'product_view', 'Viewed product detail'),
(2, 6, 'product_view', 'Viewed product detail'),
(1, 1, 'click', 'Clicked product'),
(2, 5, 'click', 'Clicked product');

--Insert search history test data
INSERT INTO search_history (user_id, keyword) VALUES
(1, 'iphone'),
(1, 'javascript'),
(2, 'basketball'),
(2, 'running shoes');

