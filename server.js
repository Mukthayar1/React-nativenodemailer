const dotenv = require('dotenv');
let express = require('express')
let app = express()
let cors = require('cors')
const nodemailer = require('nodemailer')

dotenv.config({ path: './config.env' });

const Port = process.env.Port || 8000;





app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())

app.post('/sendMail', (req, res) => {

  const Emaileee = req.body.Emailee
  const Email = process.env.Email;
  const Password = process.env.Password;


  let { Emailee } = req.body;
  let {digit} = req.body
  let email = Emailee


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${Email}`,
      pass: `${Password}`
    }
  });


  var myMailOptions = {
    from: Email,
    to: email,
    subject: 'Forgot Password',
    html: `
    <Center>
    <h1 style="color:'red'">Password Change Alert</h1>
    <p>This is your 6 digit code ${digit}  will be expire in 60 seconds</p>
    </Center>
      
    `
  };

  transporter.sendMail(myMailOptions, function (error, info) {
    if (error) {
      return res.json({
        status: false,
        msg: "An unexpected problem occured",
        error,
      });
    } else {
      return res.json({
        status: true,
        msg: "Your password has changed",
        emailsendto: email
      })
    }
  })
})

app.listen(Port, () => {
  console.log('Listening on port 7000')
})