# Bolt Bite - Modern Food Delivery Application

## 🚀 Project Overview

**Bolt Bite** is a full-stack, production-ready food delivery application built with modern web technologies. It provides a seamless experience for customers to browse restaurants, view menus, add items to cart, and proceed to checkout with multiple payment options. The platform includes AI-powered customer support and intelligent food pairing recommendations.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Screenshots & Usage](#screenshots--usage)
- [Future Enhancements](#future-enhancements)

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library for building interactive interfaces
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Axios** - HTTP client for API requests
- **LocalStorage** - Client-side data persistence

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Google Generative AI (Gemini 2.0)** - AI-powered chat support
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Tools & Utilities
- **Git & GitHub** - Version control
- **VS Code** - Development environment
- **Postman** - API testing
- **npm** - Package manager

---

## ✨ Features

### 1. **Restaurant Discovery**
- ✅ Browse 7+ pre-seeded restaurants with unique images
- ✅ View restaurant ratings, cuisines, and delivery information
- ✅ Search restaurants by name and cuisine
- ✅ Responsive restaurant cards with hover effects

### 2. **Menu & Ordering**
- ✅ Dynamic menu display with categorized food items
- ✅ 50+ food items with specific, high-quality Unsplash images
- ✅ Veg/Non-veg indicators for each item
- ✅ Discount badges for promotional items (up to 30% off)
- ✅ Real-time price calculation
- ✅ Add to cart with quantity controls (+ / - buttons)
- ✅ Cart persistence across sessions

### 3. **Shopping Cart**
- ✅ View all selected items with images and quantities
- ✅ Update quantities in real-time
- ✅ Remove items from cart
- ✅ Calculate subtotal, tax, and delivery fees
- ✅ Include cutlery option
- ✅ Sticky order summary panel

### 4. **Checkout Process**
- ✅ 3-step checkout flow:
  1. **Cart Review** - Confirm items with images
  2. **Delivery Details** - Enter name, email, address, contact
  3. **Payment Method Selection**
- ✅ Progress bar showing checkout steps
- ✅ Form validation
- ✅ Back/Next navigation

### 5. **Multiple Payment Methods**
- ✅ **Credit/Debit Card** - With card number, expiry, CVV
- ✅ **UPI** - Google Pay, PhonePe, Paytm compatible
- ✅ **Digital Wallets** - Apple Pay, Google Wallet support
- ✅ **Cash on Delivery (COD)** - Pay at doorstep
- ✅ Secure payment flow

### 6. **AI-Powered Support**
- ✅ Floating support button (bottom-right corner)
- ✅ Live chat with **Gemini 2.0 AI** integration
- ✅ Smart food recommendations based on menu
- ✅ **Aggressive discount highlighting** - Automatically highlights ongoing deals
- ✅ Natural language interactions
- ✅ Fallback responses when API is unavailable
- ✅ Response caching for performance

### 7. **Smart Food Pairing**
- ✅ AI-powered pairing suggestions
- ✅ Flavor profile-based recommendations:
  - Spicy dishes pair with creamy beverages
  - Savory items pair with tangy accompaniments
  - Heavy meals pair with light desserts
- ✅ Display pairing reasons to users

### 8. **UI/UX Design**
- ✅ **Minimalist & Modern** design with Tailwind CSS
- ✅ **Responsive** - Mobile, tablet, and desktop optimized
- ✅ **Food Images** - Specific, high-quality images for each item
- ✅ **Restaurant Images** - Unique themed images for 7 restaurants
- ✅ **Gradient Hero Section** - Eye-catching landing page
- ✅ **Smooth Animations** - Hover effects, transitions, loading states
- ✅ **Dark Mode Ready** - CSS variables for easy theming
- ✅ **Accessibility** - Semantic HTML, ARIA labels

### 9. **Data & Database**
- ✅ **MongoDB Integration** - Store restaurants, orders, user data
- ✅ **Pre-seeded Data** - 7 restaurants with complete menu data
- ✅ **50+ Menu Items** - Organized by category (Pizzas, Chinese, Indian, etc.)
- ✅ **Discount System** - Integrated promotional pricing
- ✅ **Flavor Profiles** - AI-powered pairing system

### 10. **Admin & Backend Features**
- ✅ **RESTful API** - Well-structured endpoints
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Authentication Ready** - Structure for user authentication
- ✅ **CORS Enabled** - Secure cross-origin requests
- ✅ **Environment Variables** - Secure configuration management

---

## 📁 Project Structure
