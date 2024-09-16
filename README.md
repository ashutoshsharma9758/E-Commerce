# E-commerce Application

This is a full-stack e-commerce application that allows users to browse products, add items to the cart, and proceed to checkout. Admins can manage products and orders.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Products](#products)
  - [Cart](#cart)
- [Middlewares](#middlewares)
- [Models](#models)
- [How to Run](#how-to-run)
- [Frontend](#frontend)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. Clone the repository.
    ```
    git clone https://github.com/ashutoshsharma9758/E-Commerce
    ```
2. Navigate to the `Backend` folder.
    ```
    cd backend
    ```
3. Install the necessary dependencies.
    ```
    npm install
    ```
3. Navigate to the `Frontend` folder.
    ```
    cd Backend
    ```
4. Install the necessary dependencies.
    ```
    npm install
    ```
4. Run the application.
    ```
    npm run dev
    ```

## Project Structure

```plaintext
backend/
│
├── config/
│   └── db.js                # Database configuration
│
├── controllers/
│   ├── authController.js     # Handles authentication logic
│   ├── carController.js      # Handles car-related logic
│   └── productController.js  # Handles product-related logic
│
├── middlewares/
│   ├── isLoggedIn.js         # Middleware to check if a user is logged in
│   └── isOwner.js            # Middleware to check if the user is the owner of a resource
│
├── models/
│   ├── cart.js               # Cart model
│   ├── product.js            # Product model
│   └── user.js               # User model
│
├── routes/
│   ├── authRoute.js          # Authentication routes
│   ├── cartRoute.js          # Cart routes
│   └── productRoute.js       # Product routes
│
├── .env                      # Environment variables
├── app.js                    # Main entry point for the backend
└── frontend/                 # Frontend code (separate folder outside backend)

## API Documentation

### Authentication

- **POST** `http://localhost:8080/register`  
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string"
      "admin": "boolean"
    }
    ```
  - **Response**: 
    ```json
    {
      "message": "User registered successfully",
      "user": { "id": "string", "name": "string", "email": "string", "admin": "boolean" }
    }
    ```

- **POST** `http://localhost:8080/login`  
  - **Description**: Authenticate a user and return a JWT token.
  - **Request Body**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Response**: 
    ```json
    {
      "token": "jwt-token",
      "user": { "id": "string", "name": "string", "email": "string" }
    }
    ```

### Products

- **GET** `http://localhost:8080/products`  
  - **Description**: Fetch a list of all products.
  - **Response**:
    ```json
    [
      {
        "id": "string",
        "name": "string",
        "price": "number",
        "description": "string",
        "imageUrl": "string"
      }
    ]
    ```

- **POST** `http://localhost:8080/products` (Admin only)  
  - **Description**: Add a new product.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "price": "number",
      "description": "string",
      "imageUrl": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Product added successfully",
      "product": { "id": "string", "name": "string", "price": "number" }
    }
    ```

- **PUT** `http://localhost:8080/products/:id` (Admin only)  
  - **Description**: Update an existing product by ID.
  - **Request Body**:
    ```json
    {
      "name": "string",
      "price": "number",
      "description": "string",
      "imageUrl": "string"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Product updated successfully",
      "product": { "id": "string", "name": "string", "price": "number" }
    }
    ```

- **DELETE** `http://localhost:8080/products/:id` (Admin only)  
  - **Description**: Delete a product by ID.
  - **Response**:
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Cart

- **GET** `http://localhost:8080/cart`  
  - **Description**: Get the current user's cart.
  - **Response**:
    ```json
    {
      "user": "string",
      "items": [
        {
          "product": { "id": "string", "name": "string", "price": "number" },
          "quantity": "number"
        }
      ]
    }
    ```

- **POST** `http://localhost:8080/cart`  
  - **Description**: Add a product to the user's cart.
  - **Request Body**:
    ```json
    {
      "productId": "string",
      "quantity": "number"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Product added to cart",
      "cart": { "user": "string", "items": [...] }
    }
    ```

- **DELETE** `http://localhost:8080/cart/:id`  
  - **Description**: Remove a product from the user's cart by product ID.
  - **Response**:
    ```json
    {
      "message": "Product removed from cart"
    }
    ```

