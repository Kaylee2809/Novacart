# NovaCart

NovaCart is a modern e-commerce platform designed to provide users with
a seamless online shopping experience.

Users can browse products, manage accounts, add items to a cart, and
complete purchases.

------------------------------------------------------------------------

## Features

### User Management

-   User registration
-   Login authentication
-   Profile management

### Products

-   Browse products
-   View product details
-   Search products
-   Product categories

### Shopping Cart

-   Add products
-   Remove products
-   Update quantities
-   View cart summary

### Orders

-   Create orders
-   Track purchases
-   View order history

### Admin Dashboard

-   Admin authentication
-   Manage products
-   Manage inventory
-   Manage users
-   Manage orders

------------------------------------------------------------------------

## Admin Login Details

For testing the admin functionality:

    Email:
    admin@novacart.com

    Password:
    admin123

> Note: These credentials are for development/testing purposes only.
> Change them before deploying the application.

------------------------------------------------------------------------

## Technologies

### Frontend

-   React
-   Vite
-   Axios
-   CSS

### Backend

-   Node.js
-   Express.js

### Database

-   MongoDB
-   Mongoose

### Authentication

-   JWT
-   bcrypt

------------------------------------------------------------------------

## Project Structure

    NovaCart
    ├── client
    ├── server
    └── README.md

------------------------------------------------------------------------

## Installation

Clone repository:

``` bash
git clone <repository-url>
```

### Backend

``` bash
cd server
npm install
```

Create `.env`:

    MONGO_URL=
    JWT_SECRET=

Run:

``` bash
npm run dev
```

### Frontend

``` bash
cd client
npm install
npm run dev
```

------------------------------------------------------------------------

## API Overview

### Authentication

    POST /api/auth/register
    POST /api/auth/login

### Products

    GET /api/products
    POST /api/products
    PUT /api/products/:id
    DELETE /api/products/:id

### Orders

    POST /api/orders
    GET /api/orders/:id

------------------------------------------------------------------------

## Future Improvements

-   Payment integration
-   Reviews
-   Wishlist
-   Recommendations
-   Stock alerts
-   Deployment

------------------------------------------------------------------------

## Author

Kaylee Hiralall
