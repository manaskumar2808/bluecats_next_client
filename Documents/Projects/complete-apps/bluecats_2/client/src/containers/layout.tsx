import Navigation from "@/components/navigation";
import { Body, Container, Content, Footer, Header, Left, Right } from "@/styles/containers/layout";
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <Container>
            <Header>
                <Navigation />
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