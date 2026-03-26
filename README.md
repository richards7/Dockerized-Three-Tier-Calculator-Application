# Dockerized Three-Tier Calculator Application

## Overview

This project demonstrates a simple three-tier web application using Docker. The frontend collects user input, the backend processes the calculation, and MongoDB stores the results. It helps in understanding how containerized services communicate and work together in a real-world setup.

---

## Architecture

* Frontend (Nginx + HTML/JS)
* Backend (Node.js + Express API)
* Database (MongoDB)
[ VS Code (Development Environment) ]
        │
        │  (Write Code: frontend, backend, docker-compose)
        ▼
[ Docker Build Process ]
        │
        │  docker-compose up --build
        ▼
[ Docker Engine ]
        │
        ├───────────────┬────────────────┬────────────────
        ▼               ▼                ▼
[ Frontend Container ] [ Backend Container ] [ MongoDB Container ]
   (Nginx)               (Node.js API)        (Database)
        │                    │                    │
        │ HTTP Request       │ Process Logic      │ Store Data
        │ (User Input)       │ + Logging          │
        ▼                    ▼                    ▼
[ Browser UI ]       [ console.log() ]     [ MongoDB Storage ]
                           │
                           │ stdout
                           ▼
                   [ Docker Logging System ]
                           │
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼
[ VS Code Terminal Logs ]           [ Docker Desktop Logs Tab ]
(docker-compose logs -f)           (Auto-stream per container)
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

