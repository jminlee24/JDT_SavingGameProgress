const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 42069;

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());

app.use(cors());

app.post("/save", (req, res) => {
  console.log(req.body);
  res.send({ saved: true });
});

app.listen(PORT, () => {
  console.log("listening on " + PORT);
});
