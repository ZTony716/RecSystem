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

--Insert new data to products
INSERT INTO products
(product_id, product_name, category_id, price, description, image_url, stock_quantity, created_at)
VALUES
-- Electronics
(11, 'Wireless Mouse', 1, 25.00, 'Ergonomic wireless mouse for office and home use', 'https://example.com/wirelessmouse.jpg', 80, NOW()),
(12, 'Mechanical Keyboard', 1, 89.00, 'Responsive mechanical keyboard with RGB backlight', 'https://example.com/mechkeyboard.jpg', 45, NOW()),
(13, 'Bluetooth Headphones', 1, 129.00, 'Over-ear bluetooth headphones with immersive sound', 'https://example.com/headphones.jpg', 35, NOW()),
(14, 'USB-C Hub', 1, 49.00, 'Multi-port USB-C hub for laptops and tablets', 'https://example.com/usbchub.jpg', 70, NOW()),
(15, 'Smart Watch', 1, 199.00, 'Stylish smartwatch with health and fitness tracking', 'https://example.com/smartwatch.jpg', 40, NOW()),
(16, 'Portable Speaker', 1, 59.00, 'Compact portable speaker with clear stereo sound', 'https://example.com/speaker.jpg', 55, NOW()),
(17, 'Tablet Stand', 1, 22.00, 'Adjustable tablet stand for desk and bedside use', 'https://example.com/tabletstand.jpg', 90, NOW()),
(18, 'Gaming Monitor', 1, 299.00, 'High refresh rate gaming monitor with vivid colors', 'https://example.com/monitor.jpg', 20, NOW()),

-- Books
(19, 'Python Programming', 2, 42.00, 'Beginner-friendly guide to Python programming concepts', 'https://example.com/pythonbook.jpg', 75, NOW()),
(20, 'React Essentials', 2, 48.00, 'Practical guide to building modern web apps with React', 'https://example.com/reactbook.jpg', 65, NOW()),
(21, 'Data Science Basics', 2, 55.00, 'Introduction to data analysis, visualization, and machine learning', 'https://example.com/datasciencebook.jpg', 50, NOW()),
(22, 'UI UX Design Handbook', 2, 46.00, 'Essential principles and methods for UI and UX design', 'https://example.com/uiuxbook.jpg', 40, NOW()),
(23, 'Database Systems', 2, 58.00, 'Comprehensive overview of relational database systems', 'https://example.com/dbbook.jpg', 35, NOW()),
(24, 'Node.js in Action', 2, 44.00, 'Hands-on guide to backend development with Node.js', 'https://example.com/nodebook.jpg', 60, NOW()),
(25, 'Machine Learning Intro', 2, 62.00, 'Accessible introduction to machine learning methods and applications', 'https://example.com/mlbook.jpg', 30, NOW()),
(26, 'Modern CSS Design', 2, 37.00, 'Creative and practical guide to modern CSS layout and styling', 'https://example.com/cssbook.jpg', 55, NOW()),

-- Sports
(27, 'Yoga Mat', 3, 35.00, 'Non-slip yoga mat for stretching and home workouts', 'https://example.com/yogamat.jpg', 85, NOW()),
(28, 'Dumbbell Set', 3, 79.00, 'Adjustable dumbbell set for strength training', 'https://example.com/dumbbells.jpg', 25, NOW()),
(29, 'Soccer Ball', 3, 32.00, 'Durable soccer ball for training and matches', 'https://example.com/soccerball.jpg', 70, NOW()),
(30, 'Tennis Racket', 3, 119.00, 'Lightweight tennis racket with excellent control', 'https://example.com/tennisracket.jpg', 30, NOW()),
(31, 'Fitness Tracker', 3, 69.00, 'Wearable tracker for steps, calories, and workouts', 'https://example.com/fitnesstracker.jpg', 45, NOW()),
(32, 'Resistance Bands', 3, 24.00, 'Versatile resistance bands for strength and mobility training', 'https://example.com/bands.jpg', 95, NOW()),
(33, 'Sports Water Bottle', 3, 18.00, 'Leak-proof sports bottle for gym and outdoor activities', 'https://example.com/waterbottle.jpg', 110, NOW()),
(34, 'Cycling Helmet', 3, 54.00, 'Protective cycling helmet with breathable design', 'https://example.com/helmet.jpg', 50, NOW()),

-- Food
(35, 'Dark Chocolate', 4, 10.00, 'Rich dark chocolate with smooth cocoa flavor', 'https://example.com/chocolate.jpg', 140, NOW()),
(36, 'Organic Honey', 4, 16.00, 'Natural organic honey with a delicate floral taste', 'https://example.com/honey.jpg', 90, NOW()),
(37, 'Pasta', 4, 8.00, 'Classic durum wheat pasta for everyday cooking', 'https://example.com/pasta.jpg', 130, NOW()),
(38, 'Olive Oil', 4, 22.00, 'Extra virgin olive oil for salads and cooking', 'https://example.com/oliveoil.jpg', 75, NOW()),
(39, 'Granola', 4, 14.00, 'Crunchy granola made with oats, nuts, and dried fruit', 'https://example.com/granola.jpg', 85, NOW()),
(40, 'Almond Milk', 4, 9.00, 'Smooth almond milk alternative with light nutty flavor', 'https://example.com/almondmilk.jpg', 95, NOW()),
(41, 'Green Tea Powder', 4, 15.00, 'Premium green tea powder for drinks and desserts', 'https://example.com/greenteapowder.jpg', 60, NOW()),
(42, 'Protein Bar', 4, 6.00, 'Nutritious protein bar for quick energy and recovery', 'https://example.com/proteinbar.jpg', 150, NOW()),

-- Fashion
(43, 'Denim Jeans', 5, 59.00, 'Classic slim-fit denim jeans for everyday wear', 'https://example.com/jeans.jpg', 65, NOW()),
(44, 'Hoodie', 5, 45.00, 'Comfortable cotton hoodie for casual style', 'https://example.com/hoodie.jpg', 80, NOW()),
(45, 'Leather Belt', 5, 28.00, 'Durable leather belt with simple metal buckle', 'https://example.com/belt.jpg', 100, NOW()),
(46, 'White T-Shirt', 5, 19.00, 'Soft basic white t-shirt for daily outfits', 'https://example.com/tshirt.jpg', 120, NOW()),
(47, 'Running Shorts', 5, 26.00, 'Lightweight running shorts for active movement', 'https://example.com/shorts.jpg', 75, NOW()),
(48, 'Casual Backpack', 5, 68.00, 'Practical casual backpack with multiple compartments', 'https://example.com/backpack.jpg', 40, NOW()),
(49, 'Baseball Cap', 5, 21.00, 'Classic baseball cap with adjustable strap', 'https://example.com/cap.jpg', 95, NOW()),
(50, 'Summer Dress', 5, 72.00, 'Elegant summer dress with breathable fabric', 'https://example.com/dress.jpg', 35, NOW());
