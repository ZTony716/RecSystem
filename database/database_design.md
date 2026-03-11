
# Database Design

## Overview

The system uses PostgreSQL to manage data for the Intelligent Recommendation System.

The database supports:

- user management
- product catalog
- behavior tracking
- recommendation results

---

## Entity Relationship Overview

The main entities are:

- Users
- Products
- Categories
- User Events
- Recommendations

---

## Tables

### users

Stores user account information.

| Column | Type | Description |
|------|------|------|
| user_id | SERIAL | Primary key |
| username | VARCHAR | Unique username |
| email | VARCHAR | User email |
| password_hash | TEXT | Encrypted password |
| created_at | TIMESTAMP | Account creation time |

---

### products

Stores product information.

| Column | Type | Description |
|------|------|------|
| product_id | SERIAL | Primary key |
| product_name | VARCHAR | Product name |
| category_id | INT | Product category |
| price | NUMERIC | Product price |
| description | TEXT | Product description |

---

### user_events

Tracks user interactions.

Event types include:

- product_view
- search
- click
