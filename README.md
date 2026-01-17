
# 芭蕉 Basho by Shivangi

**Where Poetry Meets Clay.**

Basho by Shivangi is a premium pottery studio web application that blends the Japanese aesthetic of Wabi-Sabi ("finding beauty in imperfection") with modern e-commerce and event booking functionality. The platform serves as a digital sanctuary for pottery enthusiasts to explore collections, book workshops, and share their clay experiences.

---

## 🌟 Features

### 🛍️ E-Commerce & Collection
- **Curated Product Showcase**: Browse handcrafted pottery collections (Tea Bowls, Serving Plates, Vases).
- **Shopping Cart**: Fully functional cart with robust state management.
- **Secure Payments**: Integrated Razorpay payment gateway for seamless transactions.

### 👐 Workshops & Experiences
- **Workshop Booking**: View schedules and book spots for pottery workshops (Beginner to Advanced).
- **Private Events**: specialized booking for corporate or private team-building events.
- **Community Stories**: Users can share their personal transformative stories and workshop experiences.

### 🎨 User Experience
- **Authentic Design**: A visually stunning UI using earthy tones, gradients, and Japanese typography.
- **Responsive Animations**: Smooth transitions powered by `framer-motion` and custom CSS.
- **User Profiles**: Personalized dashboard to manage bookings and profile details.

### 🔐 Security & Backend
- **Authentication**: Secure login/signup via **Firebase Authentication** (Google & Email/Password).
- **Robust API**: REST API built with **Django REST Framework**.
- **Admin Management**: Django Admin panel for managing products, workshops, and orders.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context / Hooks
- **HTTP Client**: Axios

### Backend
- **Framework**: [Django](https://www.djangoproject.com/)
- **API**: [Django REST Framework](https://www.django-rest-framework.org/)
- **Database**: SQLite (Development)
- **Authentication**: Firebase Admin SDK
- **Payments**: Razorpay Integration

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js**: v18+ 
- **Python**: v3.10+
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/sunay2403/gwoc_basho.git
cd gwoc_bashobyshivangi
```

### 2. Backend Setup
Navigate to the backend directory and set up the virtual environment.

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies (ensure requirements.txt exists or install manually)
pip install django djangorestframework django-cors-headers razorpay firebase-admin pillow

# Run Migrations
python manage.py migrate

# Create Superuser (for Admin panel)
python manage.py createsuperuser

# Start Server
python manage.py runserver
```
*The backend API will run at `http://127.0.0.1:8000/`*

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory.

```bash
cd frontend

# Install dependencies
npm install

# Start Development Server
npm run dev
```
*The frontend application will run at `http://localhost:5173/`*

---

## 📂 Project Structure

```
gwoc_bashobyshivangi/
├── backend/                 # Django Project
│   ├── api/                 # API Main App
│   ├── user/                # User Management App
│   ├── product/             # Product & E-commerce App
│   ├── workshops/           # Workshop Booking App
│   ├── payments/            # Razorpay Integration
│   ├── media/               # User Uploaded Files
│   └── serviceAccountKey.json # Firebase Credentials
│
└── frontend/                # React Vite Project
    ├── src/
    │   ├── components/      # Reusable Components (Navbar, Footer, etc.)
    │   ├── pages/           # Page Views (InfoPage, SocialMedia, Profile, etc.)
    │   ├── api/             # API Configuration (Firebase)
    │   └── assets/          # Static Images & Icons
    └── package.json
```

---

## 📞 Contact & Community

**Basho by Shivangi**  
📍 Surat, Gujarat, India  
📸 Instagram: [@bashobyyshivangi](https://www.instagram.com/bashobyyshivangi/)  
📧 Contact: bashobyshivangi@gmail.com

---

*Made with mud & soul.* 🌿