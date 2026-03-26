const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ----------------------
// MongoDB Connection (with retry)
// ----------------------
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://db:27017/calculator", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(JSON.stringify({
            service: "backend",
            event: "DB_CONNECTED",
            time: new Date().toISOString()
        }));
    } catch (err) {
        console.error(JSON.stringify({
            service: "backend",
            event: "DB_CONNECTION_FAILED",
            error: err.message,
            time: new Date().toISOString()
        }));
        setTimeout(connectDB, 5000);
    }
};

connectDB();

// ----------------------
// Schema
// ----------------------
const CalcSchema = new mongoose.Schema({
    a: Number,
    b: Number,
    result: Number,
    createdAt: { type: Date, default: Date.now }
});

const Calc = mongoose.model("Calc", CalcSchema);

// ----------------------
// Routes
// ----------------------

// Add operation
app.post("/add", async (req, res) => {
    try {
        const { a, b } = req.body;

        const numA = Number(a);
        const numB = Number(b);

        const result = numA + numB;

        const saved = await Calc.create({ a: numA, b: numB, result });

        // ✅ LOG EVERY INSERT (THIS IS THE KEY CHANGE)
        console.log(JSON.stringify({
            service: "backend",
            event: "DB_INSERT",
            input: { a: numA, b: numB },
            result: result,
            documentId: saved._id,
            time: new Date().toISOString()
        }));

        res.json({
            result,
            saved: true
        });

    } catch (err) {
        console.error(JSON.stringify({
            service: "backend",
            event: "ERROR",
            error: err.message,
            time: new Date().toISOString()
        }));

        res.status(500).json({ error: "DB insert failed" });
    }
});

// Get history
app.get("/history", async (req, res) => {
    try {
        const data = await Calc.find().sort({ createdAt: -1 });

        console.log(JSON.stringify({
            service: "backend",
            event: "FETCH_HISTORY",
            count: data.length,
            time: new Date().toISOString()
        }));

        res.json(data);

    } catch (err) {
        console.error(JSON.stringify({
            service: "backend",
            event: "ERROR",
            error: err.message,
            time: new Date().toISOString()
        }));

        res.status(500).json({ error: "Fetch failed" });
    }
});

// ----------------------
// Server Start
// ----------------------
app.listen(5000, () => {
    console.log(JSON.stringify({
        service: "backend",
        event: "SERVER_STARTED",
        port: 5000,
        time: new Date().toISOString()
    }));
});