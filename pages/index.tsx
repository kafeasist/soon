import Logo from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Typography from '@/components/ui/Typography';
import { useToast } from '@/hooks/useToast';
import { sendSubscription } from '@/lib/api';
import {
    KnownLanguagesCode,
    Responses,
    getLanguageFile,
} from '@/lib/loadLangs';
import { isDarkMode, setDarkMode, setLanguage } from '@/lib/utils';
import { Github, Loader2, Mail, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type FormValues = {
    email: string;
};

const Home = () => {
    const { register, handleSubmit } = useForm<FormValues>();
    const { toast } = useToast();

    const [dark, setDark] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [lang, setLang] = useState<KnownLanguagesCode>('en');
    const [responses, setResponses] = useState<Responses>({
        errorTitle: 'ERROR',
        errors: {},
        successTitle: 'SUCCESS',
        success: {},
        html: {},
    });

    useEffect(() => {
        setLoading(true);

        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        setDark(isDarkMode());

        const fetchResponses = async (lang: KnownLanguagesCode) => {
            const responses = await getLanguageFile(lang);
            setResponses(responses);
        };

        if (navigator) {
            if (navigator.language === 'tr' || navigator.language === 'tr-TR') {
                setLanguage('tr');
                setLang('tr');
                fetchResponses('tr');
            } else {
                setLanguage('en');
                setLang('en');
                fetchResponses('en');
            }
        }

        setLoading(false);
    }, []);

    const handleDarkMode = () => {
        if (dark) {
            setDarkMode(false);
            setDark(false);
            document.documentElement.classList.remove('dark');
        } else {
            setDarkMode(true);
            setDark(true);
            document.documentElement.classList.add('dark');
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setSending(true);
        const result = await sendSubscription(data, lang);

        if (!result.status)
            return toast({
                title: responses.errorTitle,
                description: responses.errors.unknown,
                variant: 'destructive',
            });

        if (result.status === 'success') {
            toast({
                title: responses.successTitle,
                description: result.message,
            });
        } else {
            toast({
                title: responses.errorTitle,
                description: result.message,
                variant: 'destructive',
            });
        }
        setSending(false);
    };

    if (loading) return <div />;

    return (
        <main className='h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black'>
            <section className='container mx-auto flex h-screen flex-col items-center justify-center px-16 text-center dark:text-white md:px-24 lg:px-56'>
                <div className='mb-16 lg:scale-150'>
                    <Logo dark={dark} />
                </div>
                <Typography
                    variant='h1'
                    className='mb-8 animate-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text !leading-normal text-transparent dark:from-indigo-200 dark:via-red-200 dark:to-yellow-100'
                >
                    {responses.html.comingsoon}
                </Typography>
                <Typography
                    variant='p'
                    className='text-md max-w-lg md:text-lg lg:text-xl'
                >
                    {responses.html.description}
                </Typography>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex w-full justify-center lg:scale-125'
                >
                    <div className='mt-14 w-full max-w-sm justify-center md:flex md:flex-row md:space-x-2'>
                        <Input
                            className='mb-4 md:mb-0'
                            type='email'
                            placeholder={responses.html.subscribeInput}
                            {...register('email', {
                                required: true,
                                pattern: /^\S+@\S+$/i,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full sm:ml-0 md:w-2/5'
                            disabled={sending}
                        >
                            {sending ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                responses.html.subscribe
                            )}
                        </Button>
                    </div>
                </form>
                <div className='mt-16 flex w-full items-center justify-center space-x-24'>
                    <Link
                        aria-label='GitHub'
                        href='https://github.com/kafeasist'
                        target='_blank'
                    >
                        <Github className='h-6 w-6 md:h-8 md:w-8' />
                    </Link>
                    <Button
                        variant='link'
                        onClick={handleDarkMode}
                        aria-label='theme'
                    >
                        {!dark ? (
                            <Sun className='h-6 w-6 md:h-8 md:w-8' />
                        ) : (
                            <Moon className='h-6 w-6 md:h-8 md:w-8' />
                        )}
                    </Button>
                    <Link
                        aria-label='E-mail'
                        href='mailto:destek@kafeasist.com'
                    >
                        <Mail className='h-6 w-6 md:h-8 md:w-8' />
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Home;
