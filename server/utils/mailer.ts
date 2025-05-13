import nodemailer from "nodemailer";
import {MailerI} from '../interfaces/mailerI'
import { env } from "../helpers";


export const sendMail = (options:MailerI) => {
    
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.SERVICE_MAIL, 
      pass: env.SERVICE_PASSWORD,
    },
  });

  const mailOptions = {
    from: env.SERVICE_MAIL,
    to: options.to,
    // cc: 'cc@example.com',
    // bcc: 'bcc@example.com',
    subject: "Hello from Nodemailer",
    text: "This is a test email sent from Nodemailer.",
    html : options.html
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
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
