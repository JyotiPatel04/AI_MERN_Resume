const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
 
require("dotenv").config();
const path = require('path');


require('./conn');
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: [
    "http://localhost:5173",
    "https://your-frontend-app.vercel.app"
  ]
}));

const UserRoute = require('./Routes/user');
const ResumeRoute = require('./Routes/resume');


app.use('/api/user', UserRoute);
app.use('/api/resume', ResumeRoute);

 // Serve static files from the build folder
 app.use(express.static(path.join(__dirname, "build")));

// // Catch-all route: send index.html for React Router
 app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
 });

app.listen(PORT, () => {
    console.log("Server is running on port ",  PORT);
});