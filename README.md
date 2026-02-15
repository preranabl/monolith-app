# Monolith Application - The Starting Point

## Overview

This is a **monolithic web application** where all components authentication, payment processing, frontend views, and business logic—are tightly coupled within a **single codebase** and **single deployment unit**.

**Application URL**: `http://localhost:4000`

This repository serves as:
- An educational example of monolithic architecture
- The starting point for learning microservices migration
- A comparison baseline for understanding architectural evolution
- A demonstration of scalability challenges in monoliths

---

## What is a Monolithic Architecture?

A **monolithic architecture** is a traditional software design where all application components are interconnected and interdependent in a single unified codebase.

### Characteristics of This Monolith:

| Characteristic | Description |
|---------------|-------------|
| **Single Codebase** | All features in one repository |
| **Single Process** | Runs as one application |
| **Shared Database** | All modules access the same MongoDB |
| **Tight Coupling** | Components directly call each other |
| **Unified Deployment** | Deploy everything together |
| **Single Port** | Entire app runs on port 4000 |

### Visual Architecture:

```
                    ┌─────────────────────────────────┐
                    │         BROWSER                 │
                    │     http://localhost:4000       │
                    └────────────┬────────────────────┘
                                 │
                                 │ HTTP Request
                                 │
        ┌────────────────────────▼─────────────────────────┐
        │                                                  │
        │           MONOLITH APPLICATION                   │
        │              (Single Process)                    │
        │                                                  │
        │   ┌──────────────────────────────────────────┐  │
        │   │         server.js (Port 4000)            │  │
        │   │      Express Application Server          │  │
        │   └──────────────┬───────────────────────────┘  │
        │                  │                               │
        │   ┌──────────────┼───────────────────────────┐  │
        │   │     Routing Layer (routes/)              │  │
        │   │   ┌────────────┐    ┌─────────────────┐ │  │
        │   │   │authRoutes  │    │paymentRoutes    │ │  │
        │   │   │   .js      │    │    .js          │ │  │
        │   │   └─────┬──────┘    └────┬────────────┘ │  │
        │   └─────────┼──────────────┼──────────────┘  │  │
        │             │              │                   │
        │   ┌─────────▼──────────────▼──────────────┐   │
        │   │      Models Layer (models/)           │   │
        │   │       ┌──────────────┐                │   │
        │   │       │   User.js    │                │   │
        │   │       │  (Mongoose)  │                │   │
        │   │       └──────┬───────┘                │   │
        │   └──────────────┼────────────────────────┘   │
        │                  │                             │
        │   ┌──────────────▼─────────────────────────┐  │
        │   │      Views Layer (views/)              │  │
        │   │   ┌──────────┐    ┌──────────────┐    │  │
        │   │   │index.html│    │payment.html  │    │  │
        │   │   └──────────┘    └──────────────┘    │  │
        │   │          style.css                     │  │
        │   └────────────────────────────────────────┘  │
        │                                                │
        └────────────────────┬───────────────────────────┘
                             │
                      ┌──────▼─────────┐
                      │    MongoDB     │
                      │  (Single DB)   │
                      │  Port: 27017   │
                      └────────────────┘
```

**Key Point**: Everything runs in ONE process. If any component fails or needs scaling, the ENTIRE application is affected.

---

## Project Structure Explained

Here's the complete file structure of this monolithic application:

```
MONOLITH-APP/
│
├── models/                      # Database Models (Mongoose Schemas)
│   └── User.js                  # User model for authentication
│                                   # - Defines user schema (email, password, etc.)
│                                   # - Handles password hashing
│                                   # - User validation logic
│
├──  routes/                      # Express Route Handlers
│   ├── authRoutes.js            # Authentication routes
│   │                               # - POST /login
│   │                               # - POST /register
│   │                               # - POST /logout
│   │                               # - All auth logic in one file
│   │
│   └── paymentRoutes.js         # Payment processing routes
│                                   # - POST /payment                                 
│                                   # - All payment logic in one file
│
├── views/                       # Frontend HTML Views
│   ├── index.html               # Homepage/Landing page
│   │                               # - Main entry point for users
│   │                               # - Login form
│   │                               # - Navigation
│   │
│   ├── payment.html             # Payment page
│   │                               # - Payment form
│   │                               # - Credit card input
│   │                               # - Payment confirmation
│   │
│   └── style.css                # Stylesheet for all pages
│                                   # - Global styles
│                                   # - Layout and design
│                                   # - Responsive design rules
│
├──  node_modules/                # NPM Dependencies (not in git)
│                                   # - Express, Mongoose, etc.
│                                   # - Auto-generated by npm install
│
├──  .env                         # Environment Variables
│                                   # - PORT=4000
│                                   # - MONGODB_URI=mongodb://...
│
├── docker-compose.yaml          # Docker Compose Configuration
│                                   # - Defines app service (port 4000)
│                                   # - Defines MongoDB service
│                                   # - Network configuration
│                                   # - Volume mappings
│
├── Dockerfile                   # Docker Image Configuration
│                                   # - Base image: node:16
│                                   # - Install dependencies
│                                   # - Copy application code
│                                   # - EXPOSE 4000
│                                   # - CMD to start server
│
├── package-lock.json            # Locked dependency versions
│                                   # - Auto-generated by npm
│                                   # - Ensures consistent installs
│
├── package.json                 # Node.js Project Configuration
│                                   # - Dependencies (express, mongoose, etc.)
│                                   # - Scripts (start, dev, test)
│                                   # - Project metadata
│
│
└── server.js                    # Main Application Entry Point
                                    # - Creates Express app
                                    # - Connects to MongoDB
                                    # - Registers all routes
                                    # - Serves static files (views/)
                                    # - Starts server on port 4000
                                    # - This is where everything begins!
```

### 🔍 Detailed Breakdown

#### 1. **server.js** - The Heart of the Monolith

***What it does:***
- Initializes the Express application
- Connects to single MongoDB database
- Registers ALL routes (auth + payment)
- Serves ALL views (HTML files)
- Starts server on port 4000
- Everything runs in this ONE process

---

#### 2. **models/User.js** - Database Schema

***Why it's here:***
- User model used by BOTH auth and payment routes
- Shared across the entire monolith
- Tight coupling with MongoDB

---

#### 3. **routes/authRoutes.js** - Authentication Logic

**Endpoints:**
- `POST http://localhost:4000/auth/login` - Login user


---

#### 4. **routes/paymentRoutes.js** - Payment Logic

**Endpoints:**
- `POST http://localhost:4000/payment/process` - Process payment

---

## Features

This monolith application provides:

**User Authentication**
- User login
- Login functionality

**Payment Processing**
- Payment 
- Transaction processing

 **Frontend Interface**
- Responsive HTML pages
- User-friendly forms
- CSS styling
- Static asset serving

**Database Integration**
- MongoDB for data persistence
- Mongoose ODM for schema management
- Single database for all data

- **Containerization**
- Docker support
- Docker Compose orchestration
- Easy deployment

---

### Installation Steps

#### Method 1: Using Docker 

1. **Clone the repository**
   ```bash
   git clone https://github.com/preranabl/monolith-app.git
   cd monolith-app
   ```

2. **Start with Docker Compose**
   ```bash
   docker-compose up 
   ```

3. **Access the application**
   ```
   http://localhost:4000
   ```

That's it! Docker handles everything.

---


##  Running the Application

### Start the Monolith

```bash
# Using Docker Compose (Recommended)
docker-compose up

# Or in detached mode
docker-compose up -d
```

### View Logs

```bash
# All logs
docker-compose logs -f

# Just app logs
docker-compose logs -f monolith-app
```

### Stop the Application

```bash
docker-compose down
```

### Stop and Remove Data

```bash
docker-compose down -v
```

### Rebuild After Code Changes

```bash
docker-compose up --build
```

---

## Understanding the Code

### How Everything Connects

```
1. User visits http://localhost:4000
              ↓
2. Express (server.js) serves index.html from views/
              ↓
3. User clicks "Login" button
              ↓
4. Browser sends POST to http://localhost:4000/auth/login
              ↓
5. Express routes request to authRoutes.js
              ↓
6. authRoutes.js calls User model (models/User.js)
              ↓
7. Mongoose queries/updates MongoDB
              ↓
11. User redirected to payment.html
```

### Key Code Flows

**User Registration:**
```
Browser → POST /auth/register → authRoutes.js → User.create() → MongoDB 
```

**Payment Processing:**
```
Browser → POST /payment → paymentRoutes.js → Payment Gateway → Save to MongoDB 
```

**Serving Pages:**
```
Browser → GET / → Express static middleware → views/index.html → Browser
```

---

##  Learning Objectives

By exploring this repository, you will understand:

- How monolithic applications are structured  
- How all components are tightly coupled  

---

## Next Steps

### Hands-On Learning Path

1. **You Are Here**: Understand the monolith structure
2. **Next**: Visit [breakdown-mono-multi](https://github.com/preranabl/breakdown-mono-multi)
3. **Compare**: Notice the differences
---


## 👤 Author

**Prerana Blown Lama**

- GitHub: [@preranabl](https://github.com/preranabl)
- Monolith Repository: [monolith-app](https://github.com/preranabl/monolith-app)
- Microservices Repository: [breakdown-mono-multi](https://github.com/preranabl/breakdown-mono-multi)
---