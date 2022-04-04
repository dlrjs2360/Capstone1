import express from "express"
import path from "path"
import router from "./src/routes.js"
import { connectDB } from "./src/database.js"
import { config } from "./src/config.js"

const app = express()
const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src", "views"))

app.use(router)

connectDB()
  .then(() => {
    app.listen(config.port.port, () => {
      console.log(`Server is running`)
    })
  })
  .catch(console.error)
