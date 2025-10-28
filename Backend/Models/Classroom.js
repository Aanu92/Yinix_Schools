import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Subject: { type: String, required: false },
  Teacher: { type: String, required: true },
  Room: { type: String, required: false },
  Country: { type: String, required: true },
  State: { type: String, required: true },
  School: { type: String, required: true },
  Thumbnail: { type: String, required: false }, // use String for image URL/path
  Created_At: { type: Date, default: Date.now },
  Students: [
    {
      Name: { type: String },
      Email: { type: String },
      Joined_At: { type: Date, default: Date.now },
    },
  ],
  Chats: [
    {
      Text: { type: String },
      Files: { type: String }
    },
  ],
  Assignment: [
    {
      Text: { type: String },
      Link: { type: String }
    }
  ]
});

export default mongoose.model("Classroom", ClassroomSchema);
