import { KnownLanguagesCode, getLanguageFile } from '@/lib/loadLangs';
import { prisma } from '@/lib/prisma';
import { redis } from '@/lib/redis';
import { sendEmail } from '@/lib/resend';
import { Ratelimit } from '@upstash/ratelimit';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, '10 s'),
});

type Response = {
    status: 'success' | 'error';
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>,
) {
    const { email, lang } = req.body;

    const { success } = await ratelimit.limit('subscribe');

    const responses = await getLanguageFile(lang as KnownLanguagesCode);

    if (!success)
        return res.status(429).json({
            status: 'error',
            message: responses.errors.slowdown,
        });

    if (!email)
        return res.status(400).json({
            status: 'error',
            message: responses.errors.required,
        });

    try {
        const emailExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (emailExists) {
            return res.status(400).json({
                status: 'error',
                message: responses.errors.exists,
            });
        }

        const token = uuidv4();

        await prisma.user.create({ data: { email, token } });

        await sendEmail(email, token);

        return res.status(201).json({
            status: 'success',
            message: responses.success.subscribe,
        });
    } catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({
                status: 'error',
                message: error.message,
            });
    }
}
