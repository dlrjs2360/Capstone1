import mongoose from "mongoose"

const elecSchema = mongoose.Schema(
  {
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
  },
  { versionkey: false }
)

const Elec = mongoose.model("Elec", elecSchema)

export async function newInput(req, res) {
  const data = req.body
  console.log(data)
}
