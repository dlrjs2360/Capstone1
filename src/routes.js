import express from "express"
import * as Elec from "./controller/elec.js"

const router = express.Router()

// ------------------ PageRender --------------------------------//

router.get("/", (req, res) => {
  res.render("home")
})

router.get("/result", (req, res) => {
  res.render("result")
})

// ------------------ Request --------------------------------//

router.post("/newInput", Elec.newInput)

export default router
