"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const helpers_1 = require("../helpers");
const sendMail = (options) => {
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: helpers_1.env.SERVICE_MAIL,
            pass: helpers_1.env.SERVICE_PASSWORD,
        },
    });
    const mailOptions = {
        from: helpers_1.env.SERVICE_MAIL,
        to: options.to,
        // cc: 'cc@example.com',
        // bcc: 'bcc@example.com',
        subject: "Hello from Nodemailer",
        text: "This is a test email sent from Nodemailer.",
        html: options.html
    };
    //   attachments: [
    //     {
    //       filename: 'attachment.txt',
    //       content: 'This is the content of the attachment.',
    //       encoding: 'base64'
    //     }
    //   ],
    //   inlineAttachments: [
    //     {
    //       filename: 'image.png',
    //       content: 'base64-encoded-image-content',
    //       encoding: 'base64',
    //       cid: 'image_cid'  // Content ID for referencing in HTML
    //     }
    //   ],
    //   headers: {
    //     'X-Custom-Header': 'Custom header value'
    //   },
    //   importance: 'high',
    //   readReceipt: 'your-read-receipt-email@example.com',
    //   priority: 'high',
    //   messageId: '<unique-message-id@example.com>',
    //   envelope: {
    //     from: 'custom-envelope-sender@example.com',
    //     to: 'custom-envelope-recipient@example.com'
    //   }
    // };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
};
exports.sendMail = sendMail;
