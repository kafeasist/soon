import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { KnownLanguagesCode } from './loadLangs';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isDarkMode() {
    return localStorage.theme === 'dark';
}

export function setDarkMode(value: boolean) {
    localStorage.theme = value ? 'dark' : 'light';
}

export function getLanguage(): KnownLanguagesCode {
    return localStorage.language || 'en';
}

export function setLanguage(language: KnownLanguagesCode) {
    localStorage.language = language;
}
