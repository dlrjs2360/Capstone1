import express from "express"
import path from "path"
import route from "./src/routes.js"

const app = express()
const __dirname = path.resolve()

app.set("views", path.join(__dirname, "./views"))
app.set("view engine", "ejs")

app.use(route)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src", "views"))

app.listen(8000, () => {
  console.log("Access through http://localhost:8000")
  console.log("Server running...")
})
