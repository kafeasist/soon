import { NextPage } from 'next';

interface ITypography {
    children?: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small' | 'large' | 'subtle';
    className?: string;
    style?: React.CSSProperties;
}

const Typography: NextPage<ITypography> = ({
    children,
    variant = 'p',
    style,
    className,
}) => {
    switch (variant) {
        case 'h1':
            return (
                <h1
                    className={
                        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ' +
                        className
                    }
                    style={style}
                >
                    {children}
                </h1>
            );
        case 'h2':
            return (
                <h2
                    className={
                        'scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700 ' +
                        className
                    }
                    style={style}
                >
                    {children}
                </h2>
            );
        case 'h3':
            return (
                <h3
                    className={
                        'scroll-m-20 text-2xl font-semibold tracking-tight ' +
                        className
                    }
                    style={style}
                >
                    {children}
                </h3>
            );
        case 'h4':
            return (
                <h4
                    className={
                        'scroll-m-20 text-xl font-semibold tracking-tight ' +
                        className
                    }
                    style={style}
                >
                    {children}
                </h4>
            );
        case 'p':
            return (
                <p className={'leading-7 ' + className} style={style}>
                    {children}
                </p>
            );
        case 'small':
            return (
                <small
                    className={'text-sm font-medium leading-none ' + className}
                    style={style}
                >
                    {children}
                </small>
            );
        case 'large':
            return (
                <div
                    className={
                        'text-lg font-semibold text-slate-900 dark:text-slate-50 ' +
                        className
                    }
                    style={style}
                >
                    {children}
                </div>
            );
        case 'subtle':
            return (
                <p
                    className={
                        'text-sm text-slate-500 dark:text-slate-400 ' +
                        className
                    }
                    style={style}
                >
                    {children}
                </p>
            );
    }
};

export default Typography;
