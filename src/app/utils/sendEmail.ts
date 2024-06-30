import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'chishty828rahman@gmail.com',
      pass: 'myrv qdub qprk qfxe',
    },
  });

  await transporter.sendMail({
    from: 'chishty828rahman@gmail.com', // sender address
    to, // list of receivers
    subject: 'Please Reset your password within 10 minutes!!!!!!', // Subject line
    text: "Forgot your password? Don't worry, we are here.", // plain text body
    html, // html body
  });
};
