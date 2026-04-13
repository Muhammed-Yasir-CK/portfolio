# Modern Personal Portfolio

A highly interactive and fully responsive personal portfolio website built with Next.js, Tailwind CSS, Framer Motion, and Firebase.

## Tech Stack
- Frontend: Next.js (App Router), React, Tailwind CSS v4
- Animations: Framer Motion, custom canvas (CodeRain)
- Backend: Firebase (Auth, Firestore, Storage)
- Deployment ready for Vercel

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- npm or yarn

### 2. Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Firestore Database**, **Authentication** (Email/Password), and **Storage**.
3. Register a web app in your Firebase project and get your configuration object.
4. Create a `.env.local` file in the root of this repository and add your variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Installation
Install the project dependencies:

```bash
npm install
```

### 4. Running Locally
Start the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features
- Custom Dark Theme with Glassmorphism
- 6 interconnected sections via sticky Navbar
- Admin Dashboard to manage Dynamic Data
- Framer Motion integrated interactions

## Production Build
```bash
npm run build
```
