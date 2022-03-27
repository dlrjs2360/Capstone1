import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
  res.render("index")
})

router.get("/button", (req, res) => {
  res.render("button")
})

router.post("/inform", (req, res) => {
  const { item1, item2, item3, item4 } = req.body
  console.log(
    `item1 : ${item1} item2 : ${item2} item3 : ${item3} item4 : ${item4}`
  )
  res.redirect("/")
})

export default router
