# 🍽️ Smart Food Ordering System

A full-stack food ordering web application built with **React, Node.js, Express.js, and MongoDB**. The system allows customers to browse food items, manage their cart, place orders, and track order status. Administrators can manage food items, organize menu categories, and process customer orders.

## ✨ Features

### Customer Features
- User registration and login
- Browse food items and view prices
- Search and filter food items by category
- Add items to the shopping cart and update quantities
- Place food orders
- View personal orders and track order status
- Manage account details

### Admin Features
- Admin authentication and role-based access
- Add, edit, and delete food items
- Manage food availability
- Change the display order of menu categories
- View customer orders
- Update order status

## 🛠️ Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST API

**Database and Authentication**
- MongoDB Atlas
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

### Start the backend

From the `server` directory, run the development command configured in its `package.json`, for example:

```bash
npm run dev
```

### Start the frontend

Open a second terminal at the project root:

```bash
npm run dev
```

Open the local frontend URL printed by Vite, usually:

http://localhost:5173

## 🔐 Security Notes

- Keep environment variables and database credentials private.
- Use a strong, unique JWT secret.
- Do not commit `.env` files to GitHub.
- Keep admin-only operations protected by backend authorization checks.
- Use test accounts when demonstrating the application.

## 🚀 Future Improvements

- Online payment gateway integration
- Order notifications
- Food ratings and reviews
- Deployment to a production hosting platform

## 👨‍💻 Author
**Nihar Parecha**

Developed as a full-stack web development project to simplify online food ordering and restaurant menu management.
