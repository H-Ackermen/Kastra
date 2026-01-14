import nodemailer from 'nodemailer'



const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
  port: 587,               // NOT 25
  secure: false, 
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
});

transporter.verify((error, success) => {
    if (error) {
        console.log('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

export default transporter