import express from "express";
import Classroom from "../Models/Classroom.js";
import nodemailer from "nodemailer";

const router = express.Router();

// ---------------- Create Classroom ----------------
router.post("/Classroom/create", async (req, res) => {
  const { Name, Subject, Teacher, Room, Country, State, School, Thumbnail } =
    req.body;

  try {
    const classroom = new Classroom({
      Name,
      Subject,
      Teacher,
      Room,
      Country,
      State,
      School,
      Thumbnail,
    });
    await classroom.save();
    res
      .status(201)
      .json({ message: "Classroom created successfully!", classroom });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------------- Get All Classrooms ----------------
router.get("/Classroom/all", async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.status(200).json(classrooms);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------------- Get Classroom by ID ----------------
router.get("/Classroom/:Classroom_ID", async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.Classroom_ID);
    if (!classroom)
      return res.status(404).json({ message: "Classroom not found!" });
    res.status(200).json(classroom);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------------- Invite Student ----------------
router.post("/Classroom/invite", async (req, res) => {
  const { Classroom_ID, StudentName, StudentEmail } = req.body;

  try {
    const classroom = await Classroom.findById(Classroom_ID);
    if (!classroom)
      return res.status(404).json({ message: "Classroom not found!" });

    // Add student to the array in DB
    classroom.Students.push({ Name: StudentName, Email: StudentEmail });
    await classroom.save();

    // --- Email Setup (Gmail App Password required) ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aanuolatope@gmail.com",
        pass: "yopm vjeu nfwc tmuf", // Gmail App Password
      },
    });

    const mailOptions = {
      from: '"Yinix Schools" <aanuolatope@gmail.com>',
      to: StudentEmail,
      subject: `You’ve been invited to join ${classroom.Name}!`,
      html: `
        <h2>Hello ${StudentName}!</h2>
        <p>Your teacher <b>${classroom.Teacher}</b> has invited you to join the classroom <b>${classroom.Name}</b> at <b>${classroom.School}</b>.</p>
        <p>Click below to join:</p>
        <a href="http://localhost:5500/Yinix_Classroom.html?classroomId=${classroom._id}">Join Classroom</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Student invited successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending invite", error: err.message });
  }
});

export default router;
