import { Container, Description, Fallback, Title } from '@/styles/pages/404';
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { RouteEnum } from "@/constants/route";

const NotFoundPage = () => {
    const router = useRouter();

    const goToHome = () => {
        router.replace(RouteEnum.HOME);
    }

    return (
        <Container>
            <Fallback>
                <Title>Oops! Page not found!</Title>
                <Description>Looks like that the page you are trying to access doesn&apos;t exist.</Description>
                <Button onClick={goToHome}>Go to home</Button>
            </Fallback>
        </Container>
    );
}

export default NotFoundPage;