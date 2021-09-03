const express = require("express");
const loader = require("./loaders/index")


let app = express();

// run the loader to load all modules into the memory
app = loader.load(app)