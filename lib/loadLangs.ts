export const KnownLanguages = {
    en: 'English',
    tr: 'Türkçe',
};

export interface Responses {
    errorTitle: string;
    errors: {
        [key: string]: string;
    };
    successTitle: string;
    success: {
        [key: string]: string;
    };
    html: {
        [key: string]: string;
    };
}

export type KnownLanguagesCode = keyof typeof KnownLanguages;

export const getLanguageFile = async (
    language: KnownLanguagesCode,
): Promise<Responses> => {
    return await import(`../locale/${language}.json`);
};
