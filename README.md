# 💬 LiveChat - Full Stack Real-Time Chat Application

A full-stack real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with real-time messaging powered by Socket.io.

## 🌐 Live Demo

🚀 [Explore LiveChat on Render](https://chatapp-fullstack-6ax0.onrender.com/)

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Context API

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io
- JWT for authentication

---

## 📂 Project Structure
```
Chatapp-FullStack/
│
├── backend/               # Node.js + Express backend
│   ├── config/            # Database and environment configs
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── middleware/        # JWT/auth middlewares
│   └── server.js          # Entry point for the backend
│
├── frontend/              # React frontend
│   ├── src/               # React components, pages, context
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
└── README.md              # Project documentation

```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm
- MongoDB (local or Atlas)

### 1️⃣ Backend Setup

```
cd backend
npm install
Create a .env file in the backend folder with the following variables:
```
```
env file

PORT = 5001
CLOUDINARY_CLOUD_NAME = ....
CLOUDINARY_API_KEY = ....
CLOUDINARY_API_SECRET = ....
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Then start the server:
npm start
```

### 2️⃣ Frontend Setup
```
cd frontend
npm install
npm start
🌐 Running the App
Backend: http://localhost:5000

Frontend: http://localhost:3000
```

## ✨ Features
🔐 User authentication with JWT

👥 One-on-one and group chats

📡 Real-time messaging using Socket.io

📱 Responsive UI with Tailwind CSS

🔄 Persistent chat history (MongoDB)

## 🙏 Acknowledgments
This app is inspired by real-time communication platforms and built as a learning project for MERN stack development and Socket.io integration.

## 👨‍💻 Author
Made with ❤️ by Mayur Raj Feel free to connect and explore more of my work!

## 🌟 Show your support
If you found this project helpful, consider giving it a ⭐ on GitHub and sharing it with others!
