import mongoose from "mongoose"

const elecSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

const Elec = mongoose.model("Elec", elecSchema)

export async function newInput(req, res) {
  const { name, fee, region } = req.body
  new Elec({
    name: name,
    fee: fee,
    region: region,
  }).save()
  console.log(`이름:${name} 지역:${region} 전기요금: ${fee}`)
  res.redirect("/")
}
