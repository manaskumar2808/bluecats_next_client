import { Box, ButtonWrapper, Container, Description, Row, Title } from '@/styles/pages/auth/logout';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { Button, Spinner } from 'react-bootstrap';
import { signOut } from 'next-auth/react';
import { RouteEnum } from '@/constants/route';
import { useRouter } from 'next/router';
import { useState } from 'react';

const LogoutPage = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(false);

    const onLogout = async () => {
        setLoader(true);
        await signOut({ redirect: false });
        setLoader(false);
        router.replace(RouteEnum.HOME);
    }

    const onCancel = () => {
        router.replace(RouteEnum.HOME);
    }

    return (
        <Container>
            <Box>
                <Title>Signing Out</Title>
                <Description>Are you sure, you want to logout?</Description>
                <div style={{ flex: 1 }} />
                <Row>
                    <ButtonWrapper>
                        <Button size='sm' style={{ width: '100%' }} onClick={onLogout} variant='danger'>{loader ? <Spinner style={{ color: '#fff', height: 15, width: 15 }} /> : 'Yes logout'}</Button>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        <Button size='sm' style={{ width: '100%' }} onClick={onCancel} variant='dark'>Go back</Button>
                    </ButtonWrapper>
                </Row>
            </Box>
        </Container>
    );
}

export const getServerSideProps = async ({ req, res }: GetServerSidePropsContext) => {
    const session = await getServerSession(req, res, authOptions);
    if(!session?.jwt || !session?.user) {
        return {
            redirect: {
                permanent: true,
                destination: '/auth/login',
            },
            props: {
                isAuth: false,
            },
        }
    }

    return {
        props: {
            isAuth: true,
        },
    }
}

export default LogoutPage;