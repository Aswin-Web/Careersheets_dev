const nodemailer = require("nodemailer");

const email = (to, subject, html) => {
  return new Promise(async (res, rej) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.NODEMAILER_USERNAME,
        pass: process.env.NODEMAILER_PASSWORD,
      },
        
    });
    const mailOption = {
      from: `CareerSheets ${process.env.NODEMAILER_USERNAME}`, 
      to: to,
      subject: subject,
      html: html,
    };
    await transporter.sendMail(mailOption, function (err, info) { 
      if (err) {
        console.log(err)
        return rej({ msg: "Error" });
      } else {
        console.log("Email Send")
        resolve({ msg: "email send" });
      }
    });
  });
};
module.exports = email;
