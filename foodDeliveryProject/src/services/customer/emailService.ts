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

export async function sendOrderMail(name: string, email: string) {
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
            html: `<p>Hii ${name}, <br> Your order has been confirmed.</p>`,
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