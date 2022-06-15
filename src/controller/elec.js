import mongoose from "mongoose"
import spawn from "child_process"

const elecSchema = mongoose.Schema({
  Year: {
    type: String,
    required: true,
  },
  Month: {
    type: String,
    required: true,
  },
  Goo: {
    type: String,
    required: true,
  },
  Goo: {
    type: String,
    required: true,
  },
  Fee: {
    type: Number,
    required: true,
  },
})

const Elec = mongoose.model("Elec", elecSchema)

const spawn2 = spawn.spawn

const today = new Date()
const Pyear = today.getFullYear()
const Pmonth = today.getMonth()

export async function Tohome(req, res) {
  res.render("home")
}

// export async function newInput(req, res) {
//   let { Year, Month, See, Goo, Fee } = req.body
//   const temp = Fee.split("원")[0].replace(",", "")
//   Fee = parseInt(temp)
//   console.log("날짜: ", Year, Month, "지역: ".See, Goo, "요금: ", Fee)
//   res.render("result", {
//     data: { Year, Month, See, Goo, Fee },
//   })
// }

export async function newInput(req, res) {
  let { Year, Month, See, Goo, Fee } = req.body
  console.log("클라이언트에서 받은 값", Year, Month, See, Goo, Fee)
  const temp = Fee.split("원")[0].replace(",", "")

  Fee = parseInt(temp)

  if (Year == Pyear && Month == Pmonth) {
    new Elec({
      Year,
      Month,
      See,
      Goo,
      Fee,
    }).save()
    console.log("DB에 저장")
  }

  console.log("파이썬으로 넘어가는 값", Year, Month, See, Goo, Fee)
  console.log()
  Pyear, Pmonth
  console.time("연산시간")

  if (Year == Pyear && Month == Pmonth) {
    console.log("DB에서 값 받아오기")
  } else {
    const fromPy = spawn2("python", ["hhh.py", Year, Month, See, Goo, Fee])
    fromPy.stdout.on("data", function (data) {
      const result = data.toString()
      const data_split = result.split(" ")
      console.log("파이썬으로부터 받은 값", data_split)

      data_split[3] = `/images/${data_split[3]}.png`
      data_split[4] = `/rank/${data_split[2]}.png`
    })
  }

  console.timeEnd("연산시간")
  console.log(
    "================================================================="
  )
  res.render("result", { data: data_split })
}
