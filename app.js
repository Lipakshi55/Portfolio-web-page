const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.static("port.css"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/portfolio.html");
    console.log(__dirname);
});

app.post("/", function(req, res){
    const comm = req.body.message;
    const na = req.body.nameofperson;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'leepakshinagrale55@gmail.com',
            pass: 'gfhytul'
        }
    });

    var mailOptions = {
        from: 'leepakshinagrale55@gmail.com',
        to: req.body.username,
        cc: 'leepakshinagrale55@gmail.com',
        subject: 'Thanks for giving feedback ' + na,
        text: 'Thanks for your message you have sent to us --> ' + comm
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/');
            console.log("Email sent: " + info.response);
        }
    });
});

app.listen(3000, function(){
    console.log("Server started at 3000");
});
