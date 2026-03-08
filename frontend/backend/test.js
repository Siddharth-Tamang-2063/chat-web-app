import mongoose from "mongoose";

mongoose.connect("mongodb+srv://deadstock-db:deadstock123@cluster0.m3d1by0.mongodb.net/chatapp?appName=Cluster0")
  .then(() => {
    console.log("✅ Connected!");
    process.exit(0);
  })
  .catch((err) => {
    console.log("❌ Failed:", err.message);
    process.exit(1);
  });