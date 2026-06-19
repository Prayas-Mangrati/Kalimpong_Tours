# 🌄 Kalimpong Tours

Kalimpong Tours is a full-stack tourism platform designed to help travelers discover the beauty of Kalimpong through a single, easy-to-use interface. Visitors can explore tourist attractions, hotels, and homestays, view locations on an interactive map, check live weather conditions, and use an AI-powered assistant to help plan their trip.

---

## ✨ Features

### 🌍 Visitor Features

* Browse tourist attractions, hotels, and homestays
* Search destinations by name
* Filter places by category
* Interactive maps with location markers
* Route guidance to destinations
* Live weather information for Kalimpong
* Detailed destination pages
* Responsive design for mobile, tablet, and desktop
* Visitor feedback and rating system
* Custom 404 page

### 🔐 Admin Features

* Secure JWT-based authentication
* Protected admin routes
* Add new destinations
* Edit existing destinations
* Delete destinations
* Dashboard analytics
* Admin activity tracking
* Recent activity feed
* Loading states and action feedback

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Leaflet Maps
* Chart.js
* Font Awesome

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB
* Mongoose

### APIs & Services

* OpenWeather API
* Nominatim Geocoding API
* Cloudinary (Image Storage)

---

## 📸 Project Screenshots

Add screenshots here after deployment.

### Home Page

![Home Page](screenshots/home.png)

### Destination Details

![Destination Details](screenshots/place-details.png)

### Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

### About Page

![About Page](screenshots/about.png)

---

## 🚀 Installation

### Clone the repository

```bash
git clone <your-repository-url>
cd Kalimpong-Tours
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URL=your_mongodb_connection_string

ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_OPENWEATHER_API_KEY=your_api_key
```

Run frontend:

```bash
npm run dev
```

---

## 📂 Project Structure

```text
frontend/
├── components/
├── pages/
├── context/
├── assets/

backend/
├── models/
├── routes/
├── middleware/
├── cloudConfig/
```

---

## 🔒 Security

* JWT-based authentication
* Protected admin routes
* Server-side token verification
* Environment variables for sensitive credentials
* Secure admin-only operations

---

## 🎯 Future Improvements

* Favorites / Wishlist system
* Booking integration
* Image galleries
* User accounts
* Review moderation
* Advanced trip planner
* Multi-language support

---

## 👨‍💻 Author

**Prayas Mangrati**

Computer Science Engineering Student

Built with the goal of creating a modern tourism platform for exploring Kalimpong.
