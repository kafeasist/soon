import { KnownLanguagesCode, getLanguageFile } from '@/lib/loadLangs';
import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
    status: 'success' | 'error';
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>,
) {
    const { token, lang } = req.body;

    const responses = await getLanguageFile(lang as KnownLanguagesCode);

    if (!token)
        return res.status(400).json({
            status: 'error',
            message: responses.errors.tokenNotFound,
        });

    try {
        await prisma.user.delete({ where: { token } });

        return res.status(201).json({
            status: 'success',
            message: responses.success.unsubscribe,
        });
    } catch (error: unknown) {
        if (error instanceof Error)
            return res.status(400).json({
                status: 'error',
                message: responses.errors.invalidToken,
            });
    }
}
