import { FormValues } from '@/pages';
import { KnownLanguagesCode } from './loadLangs';

export const sendSubscription = async (
    data: FormValues,
    lang: KnownLanguagesCode,
) => {
    const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ ...data, lang }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }).then((res) => res.json());

    return response;
};

export const sendUnsubscription = async (
    token: string,
    lang: KnownLanguagesCode,
) => {
    const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        body: JSON.stringify({ token, lang }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }).then((res) => res.json());

    return response;
};
