const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("Database connected successfully");
})
.catch((err) => {
  console.log("Database connection error:", err.message);
});