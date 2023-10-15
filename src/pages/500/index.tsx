import { Container, Description, Fallback, Title } from '@/styles/pages/500';

const ServerErrorPage = () => {
    return (
        <Container>
            <Fallback>
                <Title>Oops! Server Error!</Title>
                <Description>We are having problem at the server. Please try again later.</Description>
            </Fallback>
        </Container>
    );
}

export default ServerErrorPage;