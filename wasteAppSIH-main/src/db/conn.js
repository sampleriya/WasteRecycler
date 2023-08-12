const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/eco",{
mongoose
  .connect(
    "mongodb+srv://riyagarg123:Ldt1oXmFeWIrKboh@cluster0.cxfu56w.mongodb.net/Ecommerce",
    {}
  )
  .then(() => {
    console.log("conn succ");
  })
  .catch((e) => {
    console.log("faf", e);
  });
