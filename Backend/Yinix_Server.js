import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AccountsRoute from "./Routes/Accounts.js"; 
import ClassroomsRoute from "./Routes/Classrooms.js";

const app = express();

// -------------------- Middlewares --------------------
app.use(cors());
app.use(express.json());
app.use("/api", ClassroomsRoute);


// -------------------- Connect to MongoDB --------------------
const DB_URI =
  "mongodb+srv://Yinix:GoZdnUt8i1wyuJRG@yinix-cluster.koilbny.mongodb.net/YinixSchoolsDB?retryWrites=true&w=majority&appName=Yinix-Cluster";

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB connection error:", err));

// -------------------- Routes --------------------
app.use("/api/accounts", AccountsRoute);

// // Example Classroom POST route
// app.post("/Classrooms/:Classroom_ID", (req, res) => {
//   const classroomId = req.params.Classroom_ID; // gets Classroom ID from URL
//   const data = req.body; // gets JSON data sent by frontend

//   // You can now save data to MongoDB or respond
//   console.log(`Classroom ID: ${classroomId}`, data);

//   res
//     .status(200)
//     .json({ message: "Classroom data received!", classroomId, data });
// });

// -------------------- Start server --------------------
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
