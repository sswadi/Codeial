const nodemailer = require("nodemailer"); //requiring nodemailer module
const ejs = require('ejs');


//defining our transporter; transporter will be an object that will be attached to the nodemailer
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { // establishes identity
        user: 'dino',
        pass: '123'
    }
});

//need to define we will be using ejs
let renderTemplate = (data, relativePath) => {
    let mailHTML; //a variable that stores what all will be sent in the html,
    ejs
}