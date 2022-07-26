const express = require("express");
require("./database/config");
const Jwt = require("jsonwebtoken");
const jwtKey="iamkey"
const users = require("./database/user")
const contacts = require("./database/contact")
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
let port = process.env.PORT || 8000;
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.post("/register", async (req, res) => {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({
        result
    }, jwtKey, (err, token) => {
        if (err) {
            res.send({
                result: "Something Went Wrong"
            });
        }
        res.send({
            result,
            auth: token
        });
    });
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await users.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({
                user
            }, jwtKey, (err, token) => {
                if (err) {
                    res.send({
                        result: "Something Went Wrong"
                    });
                }
                res.send({
                    user,
                    auth: token
                });
            });
        } else {
            res.send({
                result: "No User Found"
            });
        }
    } else {
        res.send({
            result: "No Usersss Found"
        });
    }
});


app.post("/contact", async (req, res) => {
    let contact = new contacts(req.body);
    let result = await contact.save()
    result = result.toObject(); 
    res.status(200);
    res.send(result);
});



app.listen(port,()=>{
    console.log("listening at port ",port);
});


