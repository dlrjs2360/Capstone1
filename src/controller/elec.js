import mongoose from "mongoose"
import spawn from "child_process"

import { PythonShell } from "python-shell"

const elecSchema = mongoose.Schema({
  Year: {
    type: Number,
    required: true,
  },
  Month: {
    type: Number,
    required: true,
  },
  See: {
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
  Year = parseInt(Year)
  Month = parseInt(Month)
  var options = {
    mode: "text",
    pythonOptions: ["-u"],
    args: [Year, Month, See, Goo, Fee],
  }

  console.log("파이썬으로 넘어가는 값", Year, Month, See, Goo, Fee)
  console.log(Pyear, Pmonth)
  console.log(parseInt(Year), parseInt(Month))
  console.time("연산시간")

  if (
    Year == Pyear &&
    (parseInt(Month) == Pmonth + 1 ||
      parseInt(Month) == Pmonth ||
      parseInt(Month) == Pmonth - 1)
  ) {
    new Elec({
      Year,
      Month,
      See,
      Goo,
      Fee,
    }).save()
    const data = await Elec.find({
      Year: Year,
      Month: Month,
      See: See,
      Goo: Goo,
    })
      .select("Fee")
      .exec()

    let Feesum = 0
    let index = 0
    data.forEach((v) => {
      Feesum += v.Fee
      index += 1
    })

    console.log("DB에 저장")
    res.redirect("/")
  } else {
    PythonShell.run("hhh.py", options, function (err, result) {
      if (err) throw err
      console.log(result)
      const data_split = result[0].split(" ")
      console.log("파이썬으로부터 받은 값", data_split)

      data_split[3] = `/images/${data_split[3]}.png`
      data_split[4] = `/rank/${data_split[2]}.png`
      console.timeEnd("연산시간")
      console.log(
        "================================================================="
      )
      res.render("result", { data: data_split })
    })
  }
  // child-process로 실행방법
  // const fromPy = spawn2("python", ["hhh.py", Year, Month, See, Goo, Fee])
  // fromPy.stdout.on("data", function (data) {
}
