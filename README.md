# 🍽️ Food Sharing Website

A full-stack MERN-based food-sharing platform that connects donors and recipients by enabling users to share surplus food. The goal is to reduce food waste and create a sustainable sharing community.

---

## 🌐 Live Site

[Visit the Live Website](https://lambent-malasada-547f79.netlify.app/)

---

## 📖 Purpose

This project was built to encourage responsible food sharing by allowing users to donate, request, and manage food items. It provides an easy-to-use, secure, and responsive platform where users can:

- Share surplus food with the community.
- Request available food items.
- Manage and update their own donations.
- Keep track of requested foods.

---

## ✨ Key Features

- **Authentication System**
  - Email & Password-based authentication.
  - Social Login using Google.
  - Secure login & register with password validation.
  - Profile picture and logout button for logged-in users.

- **Home Page**
  - Eye-catching banner/slider.
  - Featured foods section displaying top 6 items.
  - “Show All” button linking to all available foods.
  - 2 additional attractive sections.
  - Framer Motion animation for an engaging experience.

- **Food Management**
  - **Add Food (Private Route):** Users can donate food with details like quantity, expiry date, and pickup location.
  - **Available Foods:** Displays all available food with sorting by expiry date and search by name.
  - **Food Details:** Displays all information about the food with a "Request" feature.
  - **Manage My Foods (Private):** Users can update or delete their own food listings.
  - **My Food Requests (Private):** Shows all foods requested by the user.

- **Request System**
  - Users can request available foods.
  - Requested foods automatically update status and move to the user’s request list.

- **Search & Sorting**
  - Search by food name.
  - Sort by expiry date for quick access to fresh foods.

- **Responsive Design**
  - Fully optimized for **mobile**, **tablet**, and **desktop** devices.

- **Additional Features**
  - Layout toggle between 3-column and 2-column views on the Available Foods page.
  - Toast notifications for login, registration, and actions.
  - Attractive UI using **Tailwind CSS** and **Framer Motion** animations.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- TanStack Query
- Framer Motion
- Axios (with custom hook)
- Firebase Authentication

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS and Dotenv for secure connections

---

## 🔐 Security

- **Firebase configuration keys** are secured with environment variables.
- **MongoDB credentials** are secured using `.env`.
- **Private routes** ensure only authenticated users can access restricted pages.

*(JWT token-based API security planned for future updates.)*

---

## 📂 Pages Overview

- **Home**
- **Available Foods**
- **Add Food** (Private)
- **Manage My Foods** (Private)
- **My Food Requests** (Private)
- **Login**
- **Signup**

---

## 📸 Screenshots

*(Add 3–4 screenshots of your website: Home, Available Foods, Add Food, and Manage Foods pages.)*

---

## 📜 Commit History

- **Client Side:** 15+ meaningful commits with clear, descriptive messages.
- **Server Side:** 8+ meaningful commits ensuring clean backend structure.

---

## 📦 NPM Packages Used

- `react-router-dom`
- `@tanstack/react-query`
- `firebase`
- `axios`
- `framer-motion`
- `sweetalert2`
- `tailwindcss`
- `dotenv`
- `cors`
- `express`
- `mongoose`

---

## 🚀 Deployment

- **Frontend:** Deployed on Netlify.
- **Backend:** Deployed on Vercel/Render with working production server.
- No CORS / 404 / 504 errors.
- Firebase domain authorization enabled for secure login.

---
<img width="1902" height="865" alt="image" src="https://github.com/user-attachments/assets/40ef99b2-830e-4a35-a50f-1f46df5d9131" />

## 👨‍💻 Author

- **Md. Anik Ali**  
  Passionate about building impactful, user-friendly, and sustainable web applications.

---

## 📝 Future Improvements

- Implement **JWT authentication** for enhanced security.
- Add real-time notifications for food requests.
- Extend analytics for donors and recipients.

---
