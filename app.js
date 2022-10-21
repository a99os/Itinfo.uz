const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const routes = require("./routes/index.routes");

const PORT = config.get("port");
const app = express();

app.use(express.json());
app.use(routes);
async function run() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log("Run Server PORT---->>>" + PORT);
    });
  } catch (error) {
    console.log("Serverda xatolik: " + error);
  }
}

run();
