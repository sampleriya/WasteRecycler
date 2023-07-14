const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const hbs = require("hbs");

const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//     "705695360233-7d9vqo0opgjodo5fo2ns4jv8bpjsomsa.apps.googleusercontent.com", // ClientID
//     "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", // Client Secret
//     "https://developers.google.com/oauthplayground" // Redirect URL
// );
// oauth2Client.setCredentials({
//     refresh_token: "1//04SYOJDKxvGReCgYIARAAGAQSNwF-L9Ir1VJb3SOVewCI9oqogwKe40zzNK2qrziHdwxH8FcQfcNrl-iSKxPM_OL86v1Tvdr9F_U"
// });
// const accessToken = oauth2Client.getAccessToken()

// const smtpTransport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//          type: "OAuth2",
//          user: "tyagiujjawal9@gmail.com",
//          clientId: "705695360233-7d9vqo0opgjodo5fo2ns4jv8bpjsomsa.apps.googleusercontent.com",
//          clientSecret: "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",
//          refreshToken: "1//04SYOJDKxvGReCgYIARAAGAQSNwF-L9Ir1VJb3SOVewCI9oqogwKe40zzNK2qrziHdwxH8FcQfcNrl-iSKxPM_OL86v1Tvdr9F_U",
//          accessToken: accessToken
//     }
// });
// tls: {
//     rejectUnauthorized: false
//   }

// const securePassword = async(password)=>{

//    const passwordHash =  await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     const passwordmatch =  await bcrypt.compare(password,passwordHash);
//     console.log(passwordmatch);

// }

// securePassword("thapa@123");

require("./db/conn");
const Register = require("./models/registers");
const async = require("hbs/lib/async");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const template_partials = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(template_partials);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});
app.use(express.static("images"));

app.get("/registercu", (req, res) => {
  res.render("registercu");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/marine", (req, res) => {
  res.render("marine");
});
app.get("/hospital", (req, res) => {
  res.render("hospital");
});
app.get("/household", (req, res) => {
  res.render("household");
});
app.get("/indus", (req, res) => {
  res.render("indus");
});
app.get("/municipal", (req, res) => {
  res.render("municipal");
});
app.get("/nuclear", (req, res) => {
  res.render("nuclear");
});
app.get("/rrr", (req, res) => {
  res.render("rrr");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//ye register ka post h

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        pincode: req.body.pincode,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        message: req.body.message,
        password: password,
        confirmpassword: cpassword,
      });
      const register = await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

// app.post("/contact", async (req, res)=>{
//     const namee = req.body.namee;
//     const emaill = req.body.emaill;
//     const phonee = req.body.phonee;
//     const messagee = req.body.messagee;
//     const subjectt = req.body.subjectt;

//     // const mailOptions = {
//     //     from: "tyagiujjawal9@gmail.com",
//     //     to: `poojasps2003@gmail.com`,
//     //     subject: `Contact Us`,
//     //     generateTextFromHTML: true,
//     //     html: `<b>Hello My myself-> ${namee} nd my mail is-> ${emaill} my phone is-> ${phonee} my mesage is-> ${messagee} my subjectt is ->${subjectt} </b>`
//     // };

//     // smtpTransport.sendMail(mailOptions, (error, response) => {
//     //     error ? console.log(error) : console.log(response);
//     //     smtpTransport.close();
//     // });
//     res.status(201).render(`marine`);

// });

app.post("/registercu", async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const pincode = req.body.pincode;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;
    console.log(firstname);
    console.log(message);
    const usermail = await Register.findOne({ pincode: pincode });

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tyagiujjawal9@gmail.com",
        pass: "yeycartlilpbbtui",
      },
    });

    let mailDetails = {
      from: "tyagiujjawal9@@gmail.com",
      to: `${usermail.email}`,
      subject: "Test mail",
      text: `Subject: Waste Pickup Request - Urgent Assistance Needed

      Dear [Service Provider's Name],
      
      I am writing to urgently request your assistance in arranging a waste pickup from my location. As a responsible citizen, I understand the importance of proper waste disposal, and I am keen to ensure the environment remains clean and healthy for everyone.
      
      Please find below my contact details and address for your reference:
      
      Email: ${usermail.email}
      Phone: ${usermail.phone}
      Address: ${usermail.message}
      
      I kindly request your prompt attention to this matter as the waste has accumulated and requires immediate removal. Your timely response and efficient service will be greatly appreciated.
      
      Thank you in advance for your cooperation. I look forward to hearing from you soon.
      
      Sincerely,
      
      [Your Name]`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs", err);
      } else {
        console.log("Email sent successfully");
      }
    });

    res.status(201).render("index");

    // if(password === cpassword){
    //     const registerEmployee = new Register({

    //         firstname: req.body.firstname,
    //         pincode: req.body.pincode,
    //         email:req.body.email,
    //         gender:req.body.gender,
    //         phone:req.body.phone,
    //         message:req.body.message,
    //         password:password,
    //         confirmpassword:cpassword

    //     })

    //     const register = await registerEmployee.save();
    //     res.status(201).render("index");

    // }else{
    //     res.send("password are not matching")
    // }
  } catch (error) {
    res.status(400).send(error);
  }
});

//ye login check h dhyan se dekhyo

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const usermail = await Register.findOne({ email: email });
    //    res.send(usermail.password);
    //    console.log(usermail);

    const isMatch = await bcrypt.compare(password, usermail.password);

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("pass r not matching");
    }
  } catch (error) {
    res.status(400).send("invalid email");
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
