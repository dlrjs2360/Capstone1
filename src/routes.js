import express from "express"
import * as Elec from "./controller/elec.js"

const router = express.Router()

// ------------------ PageRender --------------------------------//

router.get("/", Elec.Tohome)

// ------------------ Request --------------------------------//

router.post("/newInput", Elec.newInput)

export default router
