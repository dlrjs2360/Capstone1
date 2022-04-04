import express from "express"
import * as Elec from "./controller/elec.js"

const router = express.Router()

// ------------------ PageRender --------------------------------//

router.get("/", (req, res) => {
  res.render("index")
})
router.get("/button", (req, res) => {
  res.render("button")
})
router.get("/result", (req, res) => {
  res.render("result")
})

// ------------------ Request --------------------------------//

router.post("/inform", (req, res) => {
  const { item1, item2, item3, item4 } = req.body
  console.log(
    `item1 : ${item1} item2 : ${item2} item3 : ${item3} item4 : ${item4}`
  )
  res.redirect("/")
})

router.post("/newInput", Elec.newInput)

export default router
