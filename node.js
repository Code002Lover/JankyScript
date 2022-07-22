const fs = require("fs")

eval(fs.readFileSync("./compile.js").toString())

const input = fs.readFileSync("input.js").toString()

const out = compile(input)

fs.writeFileSync("output.js",out)