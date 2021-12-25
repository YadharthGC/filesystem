const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const fs = require("fs");
const http = require("http");
const foldername = "tp";
const date = require("date-and-time");
const { res } = require("date-and-time");
const { append } = require("express/lib/response");
const now = new Date();
const d = date.format(now, "HHmmssYYYYMMDD");
console.log(d);

/////////////to create a folder ...folder created if it not exsists//////
try {
  if (!fs.existsSync(foldername)) {
    fs.mkdirSync(foldername);
  }
} catch (error) {
  console.log(error);
}
/////////////File created///////////////

async function create() {
  await fs.writeFile(`./tp/${d}.txt`, `${now}`, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
}

app.get("/create", function (req, res) {
  create();
  res.json({
    message: "success",
  });
});

////////////read files/////////////////

app.get("/", async function (req, res) {
  try {
    fs.readFile(`./tp/${d}.txt`, function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } catch (error) {
    res.json({
      message: "not such file",
    });
  }
});

////////////list files/////////////////

const testFolder = "./tp/";
var b = [],
  n = -1;
fs.readdirSync(testFolder).forEach((file) => {
  n++;
  b[n] = file;
});
app.get("/files", async function (req, res) {
  try {
    console.log(b);
    res.json(b);
  } catch (error) {}
});

///////////////////////////////////////////
app.listen(port, function () {
  console.log(`App is Running in ${port}`);
});
