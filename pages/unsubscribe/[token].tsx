import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { useToast } from '@/hooks/useToast';
import { sendUnsubscription } from '@/lib/api';
import {
    KnownLanguagesCode,
    Responses,
    getLanguageFile,
} from '@/lib/loadLangs';
import { setLanguage } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler, useEffect, useState } from 'react';

const Unsubscribe = () => {
    const router = useRouter();
    const { toast } = useToast();
    const { token } = router.query;

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(true);
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

    const handleUnsubscribe: MouseEventHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await sendUnsubscription(token as string, lang);

        if (!response) {
            toast({
                title: responses.errorTitle,
                description: responses.errors.unknown,
                variant: 'destructive',
            });
        } else {
            if (response.status === 'success') {
                toast({
                    title: responses.successTitle,
                    description: response.message,
                });
                setOpen(false);
            } else {
                toast({
                    title: responses.errorTitle,
                    description: response.message,
                    variant: 'destructive',
                });
            }
        }

        setLoading(false);
    };

    return (
        <main className='h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100 dark:from-gray-700 dark:via-gray-900 dark:to-black'>
            <AlertDialog open={open}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {responses.html.wantToUnsubscribe}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {responses.html.unsubscribeDescription}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <Link href='/'>
                            <AlertDialogCancel disabled={loading}>
                                {responses.html.cancel}
                            </AlertDialogCancel>
                        </Link>
                        <AlertDialogAction
                            onClick={handleUnsubscribe}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className='animate-spin' />
                            ) : (
                                responses.html.unsubscribe
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
};

export default Unsubscribe;
