import { EmailServiceInterface } from './email.service.interface';

export class EmailService implements EmailServiceInterface {
    async sendEmail(to: string, subject: string, body: string): Promise<void> {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: 'admin@test.fr',
            subject,
            text: body,
        });
    }
}
