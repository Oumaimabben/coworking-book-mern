📘 Coworking Book MERN

A full-stack web application for managing coworking space reservations built using the MERN stack.

This platform allows users to register, log in, browse available rooms, and make reservations for coworking spaces.
🚀 Technologies Used
Frontend

React.js

JavaScript (ES6)

CSS

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

Other Tools

JWT Authentication

REST API

Axios

📂 Project Structure
coworking-book-mern
│
├── api
│   ├── controllers
│   │   ├── auth.js
│   │   ├── reservation.js
│   │   ├── room.js
│   │   └── user.js
│   │
│   ├── models
│   ├── routes
│   ├── utils
│   └── index.js
│
├── client
│   └── src
│       ├── components
│       │   └── Header.jsx
│       │
│       ├── pages
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── About.jsx
│       │   └── Createrev.jsx
│       │
│       ├── App.jsx
│       └── index.css
│
└── README.md
⚙️ Features

🔐 User authentication (Register / Login)

🧑 User management

🏢 Coworking room management

📅 Room reservation system

📡 REST API architecture

🗄 MongoDB database integration

🛠 Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/coworking-book-mern.git
cd coworking-book-mern
2️⃣ Install backend dependencies
cd api
npm install
3️⃣ Install frontend dependencies
cd ../client
npm install
▶️ Running the Project
Start the backend server
cd api
npm start

Server runs on:

http://localhost:5000
Start the frontend
cd client
npm start

Application runs on:

http://localhost:3000
🔑 API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Users
GET /api/users
GET /api/users/:id
Rooms
GET /api/rooms
POST /api/rooms
Reservations
POST /api/reservations
GET /api/reservations
📸 Application Screens
<img width="1843" height="999" alt="Screenshot from 2026-03-13 01-01-32" src="https://github.com/user-attachments/assets/5a43649a-6edf-4bde-814d-6f2761f0d69e" />
<img width="1843" height="999" alt="Screenshot from 2026-03-13 01-01-21" src="https://github.com/user-attachments/assets/cf796498-7d5f-4de8-8fcb-c62495b893b0" />
<img width="1853" height="924" alt="Screenshot from 2026-03-13 01-01-04" src="https://github.com/user-attachments/assets/986590b2-d926-400f-992a-9311063c8fa7" />
<img width="1852" height="841" alt="Screenshot from 2026-03-13 01-00-46" src="https://github.com/user-attachments/assets/ca8d0b25-8f8d-49df-a284-bf5c8472d8c5" />
<img width="1851" height="728" alt="Screenshot from 2026-03-13 01-00-22" src="https://github.com/user-attachments/assets/d478ab15-2c46-4e2e-9b2c-8922a1279214" />
<img width="1851" height="742" alt="Screenshot from 2026-03-13 01-00-08" src="https://github.com/user-attachments/assets/9da5002f-1145-4a66-8b8d-4d8caaeb94d5" />

