# Dockerized Three-Tier Calculator Application

## Overview

This project demonstrates a simple three-tier web application using Docker. The frontend collects user input, the backend processes the calculation, and MongoDB stores the results. It helps in understanding how containerized services communicate and work together in a real-world setup.

---

## Architecture

* Frontend (Nginx + HTML/JS)
* Backend (Node.js + Express API)
* Database (MongoDB)
  
## End-to-End Flow (Sequential)

1. VS Code (Development)
   │
   ├── Write frontend (HTML/JS)
   ├── Write backend (Node.js API)
   ├── Create Dockerfiles
   └── Create docker-compose.yml
   │
   ▼
2. Build & Run Application
   │
   └── Command: docker-compose up --build
   │
   ▼
3. Docker Engine Execution
   │
   ├── Builds images
   ├── Creates network
   └── Starts containers
   │
   ▼
4. Frontend Container Starts (Nginx)
   │
   └── Serves UI at http://localhost:3000
   │
   ▼
5. Backend Container Starts (Node.js)
   │
   ├── Connects to MongoDB (mongodb://db:27017)
   └── Exposes API (http://localhost:5000)
   │
   ▼
6. MongoDB Container Starts
   │
   └── Waits for data from backend
   │
   ▼
7. User Interaction (Browser)
   │
   ├── User enters values (A, B)
   └── Clicks "Add"
   │
   ▼
8. Frontend → Backend Communication
   │
   └── Sends POST request (/add)
   │
   ▼
9. Backend Processing
   │
   ├── Receives input
   ├── Performs calculation (A + B)
   ├── Stores result in MongoDB
   └── Logs operation using console.log()
   │
   ▼
10. MongoDB Storage
    │
    └── Saves document:
        { a: A, b: B, result: R }
    │
    ▼
11. Logging Flow
    │
    ├── console.log() → stdout
    └── Docker captures logs
    │
    ▼
12. Log Visualization
    │
    ├── VS Code Terminal:
    │     docker-compose logs -f backend
    │
    └── Docker Desktop:
          Containers → Backend → Logs
    │
    ▼
13. Verification
    │
    ├── Frontend → Check result in UI
    ├── Backend Logs → Check real-time logs
    └── Database → Verify stored data using mongosh

---

## ✅ Why This Format Works

* No horizontal arrows → no collapse issue
* Fully readable in GitHub preview
* Clear step-by-step execution flow
* Easy for evaluation and documentation

---

## 🎯 Key Insight

This flow shows clearly:

* Input starts from frontend
* Processing happens in backend
* Storage happens in database
* Logging is handled by backend and captured by Docker

---

---

## Features

* Simple calculator (addition)
* REST API-based backend
* MongoDB data persistence
* Multi-container Docker setup
* Real-time logging of backend operations

---

## How to Run

```bash
docker-compose up --build
```

Access:

* Frontend → http://localhost:3000
* Backend → http://localhost:5000

---

## Viewing Stored Data

Use Docker Desktop:

1. Go to **Containers**
2. Open MongoDB container
3. Go to **Exec**
4. Run:

```bash
mongosh
```

```js
use calculator
db.calcs.find().pretty()
```

---

## Real-Time Logs (Automated)

### How Logging Works

The backend is designed to log every calculation operation using structured logging.
Each time a user performs an addition, the backend generates a JSON log and prints it to the console.

Since Docker automatically captures console output, these logs are visible in real-time.

---

### 🔄 Viewing Backend Logs in Docker Desktop

1. Open **Docker Desktop**
2. Go to **Containers**
3. Select the **backend container**
4. Open the **Logs tab**

➡️ As soon as you perform a calculation in the frontend, logs will automatically appear here without any manual refresh.

---

### Example Log Output

When a user inputs:

```
3 + 5
```

The backend generates:

```json
{"event":"DB_INSERT","a":3,"b":5,"result":8,"time":"2026-03-26T10:00:00Z"}
```

This confirms:

* Input received correctly
* Calculation performed in backend
* Data stored in database

---

## Actual Output of the Project

### Frontend Output

User enters:

```
A = 3
B = 5
```

Displayed result:

```
Result: 8
```

---

### Backend Logs (Docker Desktop)

```
{"event":"DB_INSERT","a":3,"b":5,"result":8}
{"event":"DB_INSERT","a":10,"b":2,"result":12}
```

---

### Database Output

```json
{
  "a": 3,
  "b": 5,
  "result": 8
}
```

---

## How to Verify the System

### 1. Verify Frontend

* Open browser → http://localhost:3000
* Enter values and check result

---

### 2. Verify Backend Logs

* Open Docker Desktop
* Go to backend container → Logs
* Perform calculation
* Ensure logs appear instantly

---

### 3. Verify Database Storage

Run inside MongoDB container:

```js
use calculator
db.calcs.find().pretty()
```

You should see stored calculations

---

## Important Note

* Backend logs show actual operations (calculation + insert)
* MongoDB logs only show internal database activity
* Application-level logs will always appear in backend container

---

## Docker Commands (Optional CLI)

```bash
docker-compose logs -f backend
```

---

## Future Improvements

* Add more operations (subtraction, multiplication, division)
* Display history directly in frontend
* Add authentication layer
* Integrate centralized logging (Grafana / ELK stack)

---

## Learning Outcome

* Understanding multi-container architecture
* Separation of concerns (frontend, backend, database)
* API-based communication
* Real-time logging in containerized environments

---

## Author

Aashish Richard J

