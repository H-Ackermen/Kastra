import transporter from "../config/nodemailer.js";

const sendEmail = async (to,subject,text,html) => {
    try {
        const mailOptions = {
            from :process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        };
        
        const info = await transporter.sendMail(mailOptions);
        if(!info) console.log("No result from nodemailer");
        else
        console.log('Email Sent',info.messageId);
        return { success: true, message: "Email sent successfully",info };
        
    } catch (error) {
          console.error("Error sending email:", error);
         return { success: false, message: "Failed to send email",error };
    }
}

export default sendEmail