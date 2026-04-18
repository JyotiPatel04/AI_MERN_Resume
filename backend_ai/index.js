require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

require('./conn');

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:5173",
    "http://localhost:4000",
    "https://ai-mern-resume.vercel.app"
  ]
}));

const UserRoute = require('./Routes/user');
const ResumeRoute = require('./Routes/resume');

app.use('/api/user', UserRoute);
app.use('/api/resume', ResumeRoute);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});