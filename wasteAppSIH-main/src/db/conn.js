const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/eco",{
mongoose
  .connect(
    "mongodb+srv://admin:fP6tKScVcL98ZRdP@cluster0.lhnaw.mongodb.net/Ecommerce",
    {}
  )
  .then(() => {
    console.log("conn succ");
  })
  .catch((e) => {
    console.log("faf", e);
  });
