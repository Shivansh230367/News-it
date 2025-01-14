const express = require("express"); 
const app = express();
const PORT = 8000;
const rootRouter = require("./routes/index.js");
const cors = require("cors");
const connect = require("./connect.js");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

connect("mongodb+srv://<'username'>:<'password'>@cluster0.ykhqkks.mongodb.net");
app.use("/api/v1", rootRouter);


app.listen(PORT, (req, res)=>{
    console.log("Server Started");
});

