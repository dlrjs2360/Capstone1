import mongoose from "mongoose"
import { config } from "./config.js"

export function connectDB() {
  return mongoose
    .connect(config.db.host, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err))
}
