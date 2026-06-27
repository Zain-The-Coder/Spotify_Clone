# 🎵 Spotify Clone — Backend API

A fully functional REST API backend for a Spotify-like music streaming application. Built with Node.js, Express, and MongoDB.

---

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens) + Cookie Parser
- **File Storage:** ImageKit
- **Password Hashing:** bcryptjs
- **Containerization:** Docker

---

## ✨ Features

- 🔐 User Registration & Login with role-based access (User / Artist)
- 🍪 Cookie-based JWT Authentication
- 🎵 Music upload & management (via ImageKit)
- 💿 Album creation & management
- 🔒 Protected routes with auth middleware
- 🐳 Dockerized for easy deployment

---

## 📁 Project Structure

```
Spotify_Clone/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── music.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── music.model.js
│   │   └── album.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   └── music.route.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── services/
│   │   └── storage.service.js
│   ├── db/
│   │   └── db.js
│   └── app.js
├── index.js
├── Dockerfile
├── package.json
└── .env
```

---

## 🔌 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Public |

### Music Routes — `/api/music`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/music/upload-music` | Upload a new song | Artist only |
| POST | `/api/music/create-album` | Create a new album | Artist only |
| GET | `/api/music/` | Get all songs | Authenticated |
| GET | `/api/music/albums` | Get all albums | Public |
| GET | `/api/music/albums/:albumId` | Get album by ID | Authenticated |

---

## 🔐 Auth Roles

| Role | Permissions |
|------|-------------|
| `user` | Can browse and listen to music |
| `artist` | Can upload music and create albums |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## 🛠️ How to Run Locally

**1. Clone the repository**
```bash
git clone https://github.com/Zain-The-Coder/Spotify_Clone.git
cd Spotify_Clone
```

**2. Install dependencies**
```bash
npm install
```

**3. Setup environment variables**
```bash
cp .env.example .env
# Fill in your values
```

**4. Run the server**
```bash
# Development
npm run dev

# Production
npm start
```

Server will start on `http://localhost:8000`

---

## 🐳 Run with Docker

```bash
docker build -t spotify-clone-backend .
docker run -p 8000:8000 --env-file .env spotify-clone-backend
```

---

## 📬 Sample API Requests

**Register as Artist:**
```json
POST /api/auth/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "artist"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get All Albums:**
```
GET /api/music/albums
```

---

## 👨‍💻 Author

**Zain** — [GitHub](https://github.com/Zain-The-Coder)

---

> Built with ❤️ for portfolio purposes