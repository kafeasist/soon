import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (email: string) => {
    await resend.sendEmail({
        from: process.env.RESEND_EMAIL_FROM,
        to: email,
        subject: 'kafeasist | Hoş geldiniz',
        react: WelcomeEmail(),
    });
};
