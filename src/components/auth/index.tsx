import { AuthMode } from '@/constants/auth';
import { RouteEnum } from '@/constants/route';
import { AppDispatch } from '@/store';
import { getAuthErrorSelector, getAuthLoaderSelector } from '@/store/selectors/auth';
import { signup } from '@/store/slices/auth';
import { Column, Container, Legend, Text, AuthLink, Row, Error as ErrorText } from '@/styles/components/auth';
import { signIn } from 'next-auth/react';     
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

interface AuthProps {
    isLogin: boolean;
    setMode: Function; 
};

const Auth = ({ isLogin = true, setMode }: AuthProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const authLoader = useSelector(getAuthLoaderSelector);
    const error = useSelector(getAuthErrorSelector);

    const [loader, setLoader] = useState(false);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const legend = isLogin ? 'Login' : 'Signup';
    const buttonText = isLogin ? 'Login' : 'Signup';

    const fields = isLogin ? [
        [ { id: 'username', value: userName, setValue: setUserName, label: 'Username', placeholder: 'Username', type: 'text' } ],
        [ { id: 'password', value: password, setValue: setPassword, label: 'Password', placeholder: 'Password', type: 'password' } ],
    ] : [
        [ { id: 'username', value: userName, setValue: setUserName, label: 'Username', placeholder: 'Username', type: 'text' } ],
        [ 
            { id: 'first-name', value: firstName, setValue: setFirstName, label: 'First Name', placeholder: 'First Name', type: 'text' },
            { id: 'last-name', value: lastName, setValue: setLastName, label: 'Last Name', placeholder: 'Last Name', type: 'text' },
        ],
        [ { id: 'phone', value: phone, setValue: setPhone, label: 'Phone', placeholder: 'Phone', type: 'phone' } ],
        [ { id: 'email', value: email, setValue: setEmail, label: 'Email', placeholder: 'Email', type: 'email' } ],
        [ { id: 'password', value: password, setValue: setPassword, label: 'Password', placeholder: 'Password', type: 'password' } ],
    ];

    const switchPrompt = isLogin ? 'Not signed up?' : 'Already a user?';
    const switchLinkText = isLogin ? 'Create an account' : 'Login instead';
    const switchLink = isLogin ? `/auth?mode=${AuthMode.SIGNUP}` : `/auth?mode=${AuthMode.LOGIN}`;

    const onSubmit = async (e: FormEvent) => {
        e?.preventDefault?.();
        try {
            setLoader(true);
            if(isLogin) {
                const result = await signIn('credentials', { redirect: false, userName, password });
                if(result?.error)
                    throw new Error(result?.error);
                setLoader(false);
                if(result?.ok)
                    router?.push(RouteEnum.HOME);
            } else {
                await dispatch(signup({ userName, password, firstName, lastName, email, phone }));
                setLoader(false);
                if(!authLoader && !error)
                    router?.replace(RouteEnum.LOGIN);
            }
        } catch(err: any) {
            setLoader(false);
            console.log('Authentication failed', err?.message);
        } 
    }

    return (
        <Container>
            <Form style={{ width: '100%' }} onSubmit={onSubmit}>
                <Column>
                    <Legend>{legend}</Legend>
                        {fields.map(row => (
                            <Row>
                                {row?.map(field => (
                                    <Form.Group key={field?.id} style={{ width: '100%' }}>
                                        <Form.Label>{field?.label}</Form.Label>
                                        <Form.Control 
                                            value={field?.value}
                                            onChange={e => field?.setValue(e?.target?.value)}
                                            placeholder={field?.placeholder}
                                            type={field?.type}
                                        />
                                    </Form.Group>
                                ))}
                            </Row>
                        ))}
                        
                        <div style={{ height: 20 }} />
                        {error && <ErrorText>{error}</ErrorText>}
                        {error && <div style={{ height: 10 }} />}
                        <Button type='submit' disabled={loader} style={{ width: '100%' }}>{loader ? <Spinner color="#fff" size='sm' /> : buttonText}</Button>
                    
                    <Text>{switchPrompt} <AuthLink href={switchLink}>{switchLinkText}</AuthLink></Text>
                </Column>
            </Form>
        </Container>
    );
}

export default Auth;