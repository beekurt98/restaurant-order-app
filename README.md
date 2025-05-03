# Ramen Lover - Restaurant Order App

![Ramen Lover Logo](https://placeholder-image-url/logo.png)

A modern restaurant ordering application built for ramen enthusiasts. This web app allows users to browse menu items, place orders, and manage their account details with a smooth user experience.

## 📖 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**
  - Sign up with email and password
  - Login with existing credentials
  - Password management
  - Profile management (update name, email)

- **Product Browsing**
  - View trending ramen dishes
  - Browse products by categories
  - Detailed product view 

- **Shopping Cart**
  - Add products to cart
  - Increase/decrease item quantities
  - Cart persistence with localStorage
  - Cart quantity indicator in navbar
  - Checkout process

- **Order Management**
  - View order history
  - Track order status
  - Grouped items in order details

- **User Profile**
  - Manage multiple delivery addresses
  - Update personal information
  - Password reset functionality

## 🛠️ Tech Stack

- **Frontend**
  - [Next.js](https://nextjs.org/) (App Router)
  - [React.js](https://reactjs.org/)
  - JavaScript
  - CSS/SCSS for styling

- **Backend & Storage**
  - [Supabase](https://supabase.io/) for database and authentication
  - Supabase Storage for image storage
  - App Routes with Next.js

- **State Management**
  - Local storage for cart persistence
  - React Context for authentication and cart management 

## 📸 Screenshots

### Home & Product Listings
![Home Page with Trending Items](https://placeholder-image-url/home.png)

### User Profile & Settings
![User Settings Page](https://placeholder-image-url/settings.png)

### Cart & Checkout
![Cart Page](https://placeholder-image-url/cart.png)

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ramen-lover.git
cd ramen-lover
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Usage

### User Flow
1. Browse trending items on the home page
2. Navigate to product categories
3. Add items to cart
4. Sign up or log in to proceed to checkout
5. Select delivery address or add a new one
6. Complete order and view order confirmation
7. Track order status from profile

## 📁 Project Structure

```
├── public/             # Static assets
├── src/                # Source code
│   ├── app/            # Next.js App Router
│   │   ├── (restaurant)/   # Restaurant-related pages
│   │   │   ├── (settings-pages)/  # User settings pages
│   │   │   │   ├── addresses/     
│   │   │   │   ├── password-management/
│   │   │   │   ├── payment-metho../ 
│   │   │   │   └── profile/      
│   │   │   ├── cart/           
│   │   │   ├── checkout/
│   │   │   ├── orders/
│   │   │   ├── products/ 
│   │   │   └── settings/
│   │   ├── components/components
│   │   ├── login/
│   │   ├── signup/
│   │   ├── App.css 
│   │   ├── globals.css 
│   │   ├── layout.js 
│   │   └── page.js
│   └── lib and services
│       └── supabase.js          # Supabase client
└── ...
```

## 🗄️ Database Schema

### Users Table
- id (UUID)
- email (String)
- name (String)
- created_at (Timestamp)

### Addresses Table
- id (UUID)
- user_id (Foreign Key)
- title (String)
- address_line (String)
- city (String)
- state (String)
- street_address (String)

### Products Table
- id (int8)
- name (String)
- description (Text)
- price (Float8)
- img_url (String)
- category_id (Foreign Key)
- is_trending (Boolean)

### Categories Table
- id (int8)
- name (String)

### Orders Table
- id (int8)
- user_id (Foreign Key)
- address_id (Foreign Key)
- paid_price (Decimal)
- status_id (Int)
- created_at (Timestamp)

### order_details Table
- id (int8)
- order_id (Foreign Key)
- product_id (Foreign Key)

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by Bee