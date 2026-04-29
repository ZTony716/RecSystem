# React + Vite & Express + Database

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Recommendation System Demo

A full-stack recommendation system demo built with **React + Vite** for the frontend and **Node.js + Express + PostgreSQL** for the backend.  
This project demonstrates user authentication, product browsing, event tracking, and a basic recommendation workflow in a modern web application.

---

## Project Overview

This project is designed as a capstone-style recommendation system demo. It includes:

- User login authentication
- Frontend and backend separation
- Product browsing interface
- Event tracking page
- Personalized recommendation display
- Local auth persistence for frontend session state
- PostgreSQL-backed backend services

The goal of this project is to simulate a real-world intelligent recommendation platform with a clean UI and a maintainable full-stack structure.

---

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express
- PostgreSQL
- dotenv
- nodemon

### Development Tools
- concurrently

---
# Features
### Authentication

User login with backend API

Auth state stored in local storage

Navbar updates immediately after login/logout using React Context

Logout support

### Product Browsing

Browse products in a responsive UI

View recommendation-related product content

Structured card-based layout

### Event Tracking

Display tracked user interactions or event data

Useful for recommendation logic demonstration

### Recommendation Flow

Supports recommendation-oriented UI design

Can be extended with personalized ranking or filtering logic

Suitable for future expansion into AI or behavior-based recommendation

---

# Getting Started
### Clone the repository
```bash
git clone <your-repository-url>
cd recommendation-demo
```

---

### Install dependencies

Install dependencies for the root, frontend, and backend.

- Root
```bash
npm install
```
- Frontend
```bash
npm install --prefix frontend
```
- Backend
```bash
npm install --prefix backend
```

---

### Configure environment variables

Create a .env file inside the backend folder.

Example:

PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_secret_key

Update the values based on your local PostgreSQL configuration.

---

### Run the project

Start both frontend and backend together from the root directory:
```bash
npm run dev
```
This will run:

- Backend server

- Frontend Vite development server

---

# Available Scripts
### Root
```bash
npm run dev
```
Runs frontend and backend together.
```bash
npm run frontend
```
Runs only the frontend.
```bash
npm run backend
```
Runs only the backend.

### Frontend

Inside frontemd/package.json, typical scripts include:
```bash
npm run dev
npm run build
npm run preview
```
---

### Backend

Inside backend/package.json, typical scripts include:
```bash
npm run dev
```
---

### Authentication Flow

- User enters email and password in the login page

- Frontend sends a request to the backend login API

- Backend validates credentials

- Backend returns user data (and token if enabled)

- Frontend stores auth info locally

- AuthContext updates the global auth state

- Navbar immediately reflects the login state

## Recommendation Logic

This project uses a hybrid recommendation system that combines weighted user behavior, personalized category preference, and product relationship analysis.

The main recommendation strategies include:
- Weighted Popular Recommendation
- Personalized Recommendation
- Similar Product Recommendation
- Also-Viewed Recommendation

User events such as `product_view`, `add_to_cart`, and `purchase_intent` are assigned different weights to better reflect user interest.

For a more detailed explanation, see [Recommendation_Algorithm.md](./Recommendation_Algorithm.md).

## AI Module

This project includes an AI-powered shopping assistant that enhances the recommendation system with natural language interaction, recommendation explanation, and database-backed product search.

### Overview

The AI module is designed to make the shopping experience more interactive and personalized. Instead of only showing static recommendation results, the system allows users to:

- understand why products are recommended
- search products using natural language
- receive concise AI-generated explanations
- interact with the system in a more human-friendly way

The AI assistant supports two major modes:

1. **Recommendation Mode**
   - Explains existing personalized recommendations
   - Helps users narrow down options from recommended products

2. **Search Mode**
   - Interprets natural language shopping requests
   - Extracts structured search filters
   - Queries the PostgreSQL database directly
   - Returns relevant product results with AI-generated summaries

---

### Core Features

- AI-generated recommendation explanation
- Natural language product search
- Search filter extraction from user input
- AI-generated product highlights
- Follow-up suggestion generation
- Structured JSON responses for frontend rendering

---

### Example User Queries

- `Why were these products recommended to me?`
- `Find wireless headphones under $50`
- `Show me affordable electronics`
- `Recommend something for students`
- `Find phones under $800`

---

### AI Workflow

#### Recommendation Mode

1. The backend collects:
   - user top categories
   - recent event types
   - recommended products
2. The AI model generates:
   - one short overall explanation
   - one short reason for each product

#### Search Mode

1. The user sends a natural language query
2. The AI extracts structured search filters
3. The backend queries the PostgreSQL database
4. The AI generates a concise response based on database results

---

### System Design

The AI module does **not** replace the database.

- **AI is responsible for:**
  - understanding user intent
  - extracting search conditions
  - generating natural language replies
  - explaining recommendation logic

- **Database is responsible for:**
  - storing products and categories
  - factual retrieval
  - filtering, sorting, and searching real products

This design helps keep the system both intelligent and reliable.

---

### Data Source Logic

#### Recommendation Mode
The assistant works with an existing recommendation list generated by the recommendation engine.

#### Search Mode
The assistant does not rely on precomputed recommendations.  
Instead, it:

1. interprets the user request
2. extracts search filters
3. queries the product database
4. generates a response based on the returned products

This prevents the AI assistant from being limited to only pre-recommended items.

---

### Database Structure Used by AI Search

The search feature is built on a normalized database schema.

#### `products`
- `product_id`
- `product_name`
- `description`
- `price`
- `image_url`
- `category_id`

#### `categories`
- `category_id`
- `category_name`

The backend joins both tables when performing AI-assisted search so that user queries about product categories can be matched against real category names.

---

### Example AI Search Response

```json
{
  "reply": "I found 5 matching products for your request.",
  "picks": [
    {
      "productName": "Wireless Headphones X1",
      "reason": "This product matches your budget and fits your request for wireless audio."
    }
  ],
  "followUp": "Would you like to narrow the search by brand or price?"
}
