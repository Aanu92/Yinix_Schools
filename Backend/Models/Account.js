import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AccountSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Role: { type: String, default: "Student" },
  Created_At: { type: Date, default: Date.now },
});

// Hash password before saving
AccountSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

// Compare password for signin
AccountSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.Password);
};

export default mongoose.model("Account", AccountSchema);
