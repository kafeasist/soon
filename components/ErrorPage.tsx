import { KnownLanguagesCode } from '@/lib/loadLangs';
import { setLanguage } from '@/lib/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface IError {
    children?: React.ReactNode;
    lang?: KnownLanguagesCode;
}

const ErrorPage: NextPage<IError> = ({ children, lang = 'en' }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        if (navigator) {
            if (navigator.language === 'tr' || navigator.language === 'tr-TR') {
                setLanguage('tr');
            } else {
                setLanguage('en');
            }
        }

        setLoading(false);
    });

    return (
        <main className='flex h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100'>
            {children}
        </main>
    );
};

export default ErrorPage;
