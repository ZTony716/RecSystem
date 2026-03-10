/*
1. Users

Stores user information.

2. Categories

Stores product categories.

3. Products

Stores basic product information.

4. User Events

Records user behavior, such as browsing, clicks, and favorites.

5. Search History

Records user search keywords.

6. User Profiles

Stores user profile information, such as preference categories and activity levels.

7. Recommendations

Stores system-generated recommendations for users.
*/

-- Create Database named integrated_recommendation_system
CREATE DATABASE integrated_recommendation_system;
-- 1. users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. categories
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. products
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description TEXT,
    image_url TEXT,
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

-- 4. user_events
CREATE TABLE user_events (
    event_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT,
    event_type VARCHAR(50) NOT NULL,
    event_value VARCHAR(255),
    event_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_events_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_events_product
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE SET NULL
);

-- 5. search_history
CREATE TABLE search_history (
    search_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    keyword VARCHAR(255) NOT NULL,
    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_search_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- 6. user_profiles
CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    favorite_category_id INT,
    recent_interest VARCHAR(255),
    activity_score NUMERIC(8,2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_profile_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_profile_category
        FOREIGN KEY (favorite_category_id)
        REFERENCES categories(category_id)
        ON DELETE SET NULL
);

-- 7. recommendations
CREATE TABLE recommendations (
    recommendation_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    score NUMERIC(8,4) DEFAULT 0,
    reason VARCHAR(255),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_recommend_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_recommend_product
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE
);
