const express = require("express");
const router = require("./routes/routes");
const app = express();

app.set("view-engine" , "ejs")
const {connect} = require("./connect");
const port = 8000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname+"/public"))

connect("mongodb://127.0.0.1:27017/shortly")
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
app.get("/" , (req,res)=> {
  res.render("index.ejs")
})
app.use("/shortly", router);
app.listen(port, () => {
  console.log("Server Running on port");
});
