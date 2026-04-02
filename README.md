# LINKPLUSE

A full-stack URL shortener SaaS with real-time click analytics, Redis caching, and device/location tracking.

---

## Features

- **URL Shortening** — Generate short links instantly with auto or custom slugs
- **Click Analytics** — Track clicks by device, browser, OS, country and referrer
- **Redis Caching** — Lightning fast redirects (~1ms) with Redis cache
- **Link Management** — Toggle, delete, search, filter and sort your links
- **History Page** — View all links with search by title, slug or URL
- **Protected Routes** — JWT authentication with auto redirect
- **Expiry Support** — Set expiry dates on links
- **Free Plan Limit** — Free users limited to 10 links

---

## Tech Stack

 Next.js | React | Tailwind CSS | Axios | JWT | Express.js 
| MongoDB + Mongoose | Redis | JWT | bcryptjs | nanoid | useragent 

---

## 📁 Project Structure

```
linkpulse/
├── client/                   # Next.js Frontend
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── analytics/[slug]/
│   │   ├── dashboard/
│   │   ├── history/
│   │   ├── not-found.jsx
│   │   ├── layout.js
│   │   └── providers.jsx
│   ├── components/
│   │   ├── LinkCard.jsx
│   │   ├── LinkForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Skeleton.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   └── lib/
│       └── api.js
│
└── server/                   # Node.js + Express Backend
    ├── controllers/
    │   ├── analytics.controller.js
    │   ├── auth.controller.js
    │   └── link.controller.js
    ├── middlewares/
    │   └── auth.middleware.js
    ├── models/
    │   ├── Click.model.js
    │   ├── Link.model.js
    │   └── User.model.js
    ├── routes/
    │   ├── analytics.routes.js
    │   ├── auth.routes.js
    │   ├── link.routes.js
    │   └── redirect.routes.js
    ├── services/
    │   └── redis.service.js
    └── index.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB
- Redis (or Docker)

### 1. Clone the repository
```bash
git clone https://github.com/task3y/linkpulse.git
cd linkpulse
```

### 2. Start Redis with Docker
```bash
docker run -d --name linkpulse-redis -p 6379:6379 redis:alpine
```

### 3. Setup Backend
```bash
cd server
npm install
```

Create `server/.env`:
```env
MONGO_URI=mongodb://localhost:27017/linkpulse
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:3000
PORT=5000
REDIS_URL=redis://localhost:6379
```

Start the server:
```bash
npm start
```

### 4. Setup Frontend
```bash
cd client
npm install
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
```

### 5. Open the app
```
http://localhost:3000
```

##  Analytics Tracked

Each click records the following:
- **Timestamp**
- **Device** — mobile, tablet, desktop
- **Browser** — Chrome, Firefox, Safari etc.
- **OS** — Windows, Android, iOS etc.
- **Country & City** — via IP geolocation
- **Referrer** — where the click came from

---

##  How Redis Caching Works

```
User clicks short link
        ↓
Check Redis cache (~1ms) 
        ↓
If not cached → query MongoDB → store in Redis
        ↓
Redirect to original URL
```

Cache expires after 24 hours or when link is deleted/disabled.

---

## 🗄 Database Schema

### User
```js
{
  name, email, password,
  plan: "free" | "pro"
}
```

### Link
```js
{
  userId, originalUrl, slug,
  customSlug, title, totalClicks,
  isActive, expiresAt
}
```

### Click
```js
{
  linkId, timestamp, ip,
  country, city, device,
  browser, os, referrer
}
```

---

## 🐳 Docker Setup

```yaml
services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

Run:
```bash
docker run -d --name linkpulse-redis -p 6379:6379 redis:alpine
```

---

## 📸 Screenshots

> Dashboard, Analytics, History pages

---

