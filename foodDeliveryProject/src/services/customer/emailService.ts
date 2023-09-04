import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function sendVerifyMail(name: string, email: string, customer_id: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verification Mail',
            html: `<p>Hii ${name}, please click here to <a href="http://localhost:4002/verify?id=${customer_id}"> verify </a> your mail.</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } 
            else {
                console.log('Email has been sent:', info.response);
            }
        });
    } catch (error : any) {
        console.log(error.message);
    }
}

export async function sendOrderMailWithOTP(name: string, email: string, otp: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Order Confirmation',
            html: `<p>Hii ${name}, <br> Your order has been confirmed. Your OTP is: <strong>${otp}</strong></p>`,
          };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } 
            else {
                console.log('Email has been sent:', info.response);
            }
        });
    } catch (error : any) {
        console.log(error.message);
    }  
}

export function generateOTP() {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }
  
    return otp;
}  