import Navigation from "@/components/navigation";
import { Body, Container, Content, Footer, Header, Left, Right } from "@/styles/containers/layout";
import { PropsWithChildren, ReactNode } from 'react';

interface LayoutProps extends PropsWithChildren {
    children: ReactNode,
    isAuth: boolean | undefined;
}

const Layout = ({ children, isAuth }: LayoutProps) => {
    return (
        <Container>
            <Header>
                <Navigation isAuth={isAuth} />
            </Header>
            <Body>
                <Left />
                <Content>
                    {children}
                </Content>
                <Right />
            </Body>
            <Footer />
        </Container>
    );
}

export default Layout;