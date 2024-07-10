

import nodemailer, { Transporter } from 'nodemailer';
import crypto from 'crypto';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}

const transporter: Transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'error.sage@gmail.com',
        pass: 'errorsage01552380163',
    },
});

export async function sendOtpEmail(email: string): Promise<boolean> {
    const otp = generateOTP();

    const mailOptions: MailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: 'OTP for Verification',
        text: `Your OTP is: ${otp}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

function generateOTP(): string {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
