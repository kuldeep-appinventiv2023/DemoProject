"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderMail = exports.sendVerifyMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function sendVerifyMail(name, email, customer_id) {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.sendVerifyMail = sendVerifyMail;
async function sendOrderMail(name, email) {
    try {
        const transporter = nodemailer_1.default.createTransport({
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
    }
    catch (error) {
        console.log(error.message);
    }
}
exports.sendOrderMail = sendOrderMail;
//# sourceMappingURL=emailService.js.map