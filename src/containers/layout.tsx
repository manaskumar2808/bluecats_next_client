import Navigation from "@/components/navigation";
import { NavBarType } from "@/constants/navigation";
import { Body, Bottom, Container, Content, Footer, Header, Left, Right } from "@/styles/containers/layout";
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

interface LayoutProps extends PropsWithChildren {
    children: ReactNode,
    isAuth: boolean | undefined;
}

const Layout = ({ children, isAuth }: LayoutProps) => { 
    return (
        <Container>
            <Header>
                <Navigation navBarType={NavBarType.TOP} isAuth={isAuth} />
            </Header>
            <Body>
                <Left />
                <Content>
                    {children}
                </Content>
                <Right />
            </Body>
            <Bottom>
                <Navigation navBarType={NavBarType.BOTTOM} isAuth={isAuth} />
            </Bottom>
            <Footer />
        </Container>
    );
}

export default Layout;