# ⚡ LinkSpark: Advanced URL Shortener & Analytics Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-00c2cb?style=for-the-badge)](https://url-shortener-ta92.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Manishgupta3239/url_shortener)

LinkSpark is a high-performance, full-stack URL management platform built to shrink links and deliver deep, real-time analytics. It goes beyond simple URL shortening by providing a secure, scalable SaaS experience complete with tiered subscriptions, a credit-based usage system, and comprehensive tracking.

---

## 🚀 Features

- **Robust URL Management**: Generate secure, collision-resistant short URLs with automatic link expiration.
- **Advanced Analytics Engine**: Track every click with rich geolocation (IP-based), device parsing, and referrer data.
- **Interactive Pro Dashboard**: Visualize your click data in real-time using beautiful Recharts integrations.
- **Tiered Subscriptions**: 
  - *Free Tier*: Operates on a credit-based system.
  - *Pro Tier*: Unlimited links and advanced analytics.
- **Payments Integration**: Secure Razorpay integration for seamless subscription upgrades.
- **Authentication**: Frictionless onboarding using Google OAuth via NextAuth.
- **QR Code Generation**: Instantly generate dynamic QR codes for easy mobile sharing.
- **Premium Glassmorphism UI**: Built with Tailwind CSS for a fully responsive, modern look and feel.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS v4, Zustand (Global State), Recharts, Lucide React
- **Backend**: Node.js, Next.js API Routes
- **Database**: MongoDB & Mongoose (Optimized with `$facet` aggregation pipelines and unique indexing)
- **Auth & Security**: NextAuth.js (Google OAuth)
- **Payments**: Razorpay API
- **Utilities**: `nanoid` for URL generation, `ua-parser-js` for device analytics

---

## 💻 How to Run Locally

Follow these steps to set up and run the project on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/Manishgupta3239/url_shortener.git
cd url_shortener
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Create a `.env` or `.env.local` file in the root of the project and add the following variables. (Make sure to replace the placeholders with your actual keys):

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

### 5. Access the Platform
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

---

## ⚙️ Technical Highlights

- **Optimized Database Queries**: Reduced 5 separate analytical queries into a single database hit using MongoDB's `$facet` aggregation pipeline.
- **Atomic Operations**: Utilized Mongoose `$inc` operators to ensure click tracking and credit deductions remain accurate under high-concurrency without race conditions.
- **Server-Side Pagination**: Implemented `skip` and `limit` to ensure `O(1)` memory footprint on the client, maintaining high performance regardless of user data volume.

---

*Built with ❤️ using Next.js and MongoDB.*
