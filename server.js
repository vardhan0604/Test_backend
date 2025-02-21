import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://test-frontendd.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));


const PORT = process.env.PORT || 5000;

// POST Route
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input" });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        
        const highestAlphabet = alphabets.length > 0 
            ? [alphabets.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).pop()] 
            : [];
        
        return res.json({
            is_success: true,
            user_id: "HarshvardhanSharma_06042004",
            email: "22BCS10218@cuchd.in",
            roll_number: "22BCS10218",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// GET Route
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
