import { NextPage } from 'next';

interface ILogo {
    dark?: boolean;
}

const Logo: NextPage<ILogo> = ({ dark = false }) => {
    if (dark) return <LogoWhite />;
    return <LogoOutlined />;
};

const LogoWhite = () => {
    return (
        <svg
            width='77'
            height='46'
            viewBox='0 0 77 46'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M38.8212 39.6933C22.1172 39.6179 10.767 15.1997 7.17987 3C41.6159 10.4579 63.1813 6.10747 69.6595 3C66.3401 15.2625 55.5253 39.7686 38.8212 39.6933Z'
                fill='#EEEEEE'
            />
            <path
                d='M2 27.5145C13.136 39.9548 43.3265 57.3713 75 27.5145C62.5389 36.8369 30.4933 49.8883 2 27.5145Z'
                fill='#EEEEEE'
            />
            <path
                d='M38.8212 39.6933C22.1172 39.6179 10.767 15.1997 7.17987 3C41.6159 10.4579 63.1813 6.10747 69.6595 3C66.3401 15.2625 55.5253 39.7686 38.8212 39.6933Z'
                stroke='#EEEEEE'
                strokeWidth='3'
            />
            <path
                d='M2 27.5145C13.136 39.9548 43.3265 57.3713 75 27.5145C62.5389 36.8369 30.4933 49.8883 2 27.5145Z'
                stroke='#EEEEEE'
                strokeWidth='3'
            />
        </svg>
    );
};

const LogoOutlined = () => {
    return (
        <svg
            width='77'
            height='46'
            viewBox='0 0 77 46'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M38.8212 39.6933C22.1172 39.6179 10.767 15.1997 7.17987 3C41.6159 10.4579 63.1813 6.10747 69.6595 3C66.3401 15.2625 55.5253 39.7686 38.8212 39.6933Z'
                fill='#EEEEEE'
            />
            <path
                d='M2 27.5145C13.136 39.9548 43.3265 57.3713 75 27.5145C62.5389 36.8369 30.4933 49.8883 2 27.5145Z'
                fill='#EEEEEE'
            />
            <path
                d='M38.8212 39.6933C22.1172 39.6179 10.767 15.1997 7.17987 3C41.6159 10.4579 63.1813 6.10747 69.6595 3C66.3401 15.2625 55.5253 39.7686 38.8212 39.6933Z'
                stroke='black'
                strokeWidth='3'
            />
            <path
                d='M2 27.5145C13.136 39.9548 43.3265 57.3713 75 27.5145C62.5389 36.8369 30.4933 49.8883 2 27.5145Z'
                stroke='black'
                strokeWidth='3'
            />
        </svg>
    );
};

export default Logo;
