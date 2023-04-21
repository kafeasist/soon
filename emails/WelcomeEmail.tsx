import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Hr } from '@react-email/hr';
import { Html } from '@react-email/html';
import { Img } from '@react-email/img';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Text } from '@react-email/text';

const baseUrl = process.env.URL || 'https://soon.kafeasist.com';

interface WelcomeEmailProps {
    token: string;
}

export const WelcomeEmail = ({ token }: WelcomeEmailProps) => (
    <Html>
        <Preview>
            Restaurant management software as a service powered with AI
        </Preview>
        <Container style={{ ...container, ...main }}>
            <Img
                src={`${baseUrl}/images/logowithtext.png`}
                width='250'
                height='50'
                alt='kafeasist Logo'
                style={logo}
            />
            <Text style={paragraph}>Hi-ya,</Text>
            <Text style={paragraph}>
                Welcome to kafeasist, the software as a service platform that
                makes managing your business much more simpler with AI. We are
                thrilled to have you on board.
            </Text>
            <Section style={btnContainer}>
                <Button
                    pX={12}
                    pY={12}
                    style={button}
                    href='https://github.com/kafeasist'
                >
                    Visit GitHub page
                </Button>
            </Section>
            <Text style={paragraph}>
                You will receive updated from kafeasist from now on. You can
                always unsubscribe from the link at the bottom of this email.
            </Text>
            <Text style={paragraph}>
                Best regards,
                <br />
                The kafeasist Engineering Team.
            </Text>
            <Hr style={hr} />
            <Link
                href={`${baseUrl}/unsubscribe/${token}`}
                aria-label='unsubscribe'
                style={footer}
            >
                Unsubscribe from newsletter
            </Link>
        </Container>
    </Html>
);

export default WelcomeEmail;

const main = {
    padding: '3rem',
    borderRadius: '12px',
    backgroundColor: '#eeeeee',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

const logo = {
    margin: '0 auto',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
};

const btnContainer = {
    textAlign: 'center' as const,
};

const button = {
    backgroundColor: '#cccccc',
    borderRadius: '16px',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
};

const hr = {
    borderColor: '#000000',
    margin: '20px 0',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
};
