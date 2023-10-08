import { AuthMode } from '@/constants/auth';
import { RouteEnum } from '@/constants/route';
import { AppDispatch } from '@/store';
import { getAuthErrorSelector, getAuthLoaderSelector } from '@/store/selectors/auth';
import { signup, updateUser } from '@/store/slices/auth';
import { Column, Container, Legend, Text, AuthLink, Row, Error as ErrorText } from '@/styles/components/auth';
import { getRandomNumber } from '@/utility/profile';
import { signIn } from 'next-auth/react';     
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { UserDoc } from '../../../types/next-auth';

interface AuthProps {
    mode: AuthMode;
    user?: UserDoc;
};

const Auth = ({ mode = AuthMode.LOGIN, user }: AuthProps) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const authLoader = useSelector(getAuthLoaderSelector);
    const authError = useSelector(getAuthErrorSelector);

    const defaultUserName = user?.userName || '';
    const defaultFirstName = user?.name?.split(' ')?.[0] || '';
    const defaultLastName = user?.name?.split(' ')?.[1] || '';
    const defaultEmail = user?.email || '';
    const defaultPhone = user?.phone || '';

    const [loader, setLoader] = useState(false);
    const [error, setError] = useState();

    const [userName, setUserName] = useState(defaultUserName);
    const [firstName, setFirstName] = useState(defaultFirstName);
    const [lastName, setLastName] = useState(defaultLastName);
    const [phone, setPhone] = useState(defaultPhone);
    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState('');

    let legend: string = '';
    let buttonText: string = '';
    let switchPrompt: string = '';
    let switchLinkText: string = '';
    let switchLink: string = '';
    let fields: any = [];

    switch(mode) {
        case AuthMode.LOGIN:
            legend = 'Login';
            buttonText = 'Login';
            switchPrompt = 'Don\'t have an account?';
            switchLinkText = 'Create an account';
            switchLink = RouteEnum.SIGNUP;
            fields = [
                [ { id: 'username', value: userName, setValue: setUserName, label: 'Username', placeholder: 'Username', type: 'text' } ],
                [ { id: 'password', value: password, setValue: setPassword, label: 'Password', placeholder: 'Password', type: 'password' } ],
            ];
            break;
        case AuthMode.SIGNUP:
            legend = 'Signup';
            buttonText = 'Signup';
            switchPrompt = 'Already as user?';
            switchLinkText = 'Login instead';
            switchLink = RouteEnum.LOGIN;
            fields = [
                [ { id: 'username', value: userName, setValue: setUserName, label: 'Username', placeholder: 'Username', type: 'text' } ],
                [ 
                    { id: 'first-name', value: firstName, setValue: setFirstName, label: 'First Name', placeholder: 'First Name', type: 'text' },
                    { id: 'last-name', value: lastName, setValue: setLastName, label: 'Last Name', placeholder: 'Last Name', type: 'text' },
                ],
                [ { id: 'phone', value: phone, setValue: setPhone, label: 'Phone', placeholder: 'Phone', type: 'phone' } ],
                [ { id: 'email', value: email, setValue: setEmail, label: 'Email', placeholder: 'Email', type: 'email' } ],
                [ { id: 'password', value: password, setValue: setPassword, label: 'Password', placeholder: 'Password', type: 'password' } ],
            ];
            break;
        case AuthMode.UPDATE:
            legend = 'Update User';
            buttonText = 'Save';
            fields = [
                [ { id: 'username', value: userName, setValue: setUserName, label: 'Username', placeholder: 'Username', type: 'text' } ],
                [ 
                    { id: 'first-name', value: firstName, setValue: setFirstName, label: 'First Name', placeholder: 'First Name', type: 'text' },
                    { id: 'last-name', value: lastName, setValue: setLastName, label: 'Last Name', placeholder: 'Last Name', type: 'text' },
                ],
                [ { id: 'phone', value: phone, setValue: setPhone, label: 'Phone', placeholder: 'Phone', type: 'phone' } ],
                [ { id: 'email', value: email, setValue: setEmail, label: 'Email', placeholder: 'Email', type: 'email' } ],
            ];
            break;
        default:
            break;
    }

    const onSubmit = async (e: FormEvent) => {
        e?.preventDefault?.();
        try {
            setLoader(true);
            switch(mode) {
                case AuthMode.LOGIN:
                    const result = await signIn('credentials', { redirect: false, userName, password });
                    if(result?.error)
                        throw new Error(result?.error);
                    setLoader(false);
                    if(result?.ok)
                        router?.push(RouteEnum.HOME);
                    break;
                case AuthMode.SIGNUP:
                    await dispatch(signup({ userName, password, firstName, lastName, email, phone, rand: getRandomNumber() }));
                    setLoader(false);
                    if(!authLoader && !authError)
                        router?.replace(RouteEnum.LOGIN);
                    break;
                case AuthMode.UPDATE:
                    await dispatch(updateUser({  id: user?.id as string, userName, firstName, lastName, email, phone }));
                    setLoader(false);
                    if(!authLoader && !authError) 
                        router?.replace(RouteEnum.PROFILE);
                    break;
                default:
                    break;
            }
        } catch(err: any) {
            setLoader(false);
            console.log('Authentication failed!', err?.message);
            setError(err?.message);
        } 
    }

    return (
        <Container>
            <Form style={{ width: '100%' }} onSubmit={onSubmit}>
                <Column>
                    <Legend>{legend}</Legend>
                        {fields.map((row: any[], index: number) => (
                            <Row key={index}>
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
                        {(error || authError) && <ErrorText>{error || authError}</ErrorText>}
                        {(error || authError) && <div style={{ height: 10 }} />}
                        <Button type='submit' disabled={loader} style={{ width: '100%' }}>{loader ? <Spinner color="#fff" size='sm' /> : buttonText}</Button>
                    
                    {switchPrompt?.length > 0 && switchLinkText?.length > 0 && <Text>{switchPrompt} <AuthLink href={switchLink}>{switchLinkText}</AuthLink></Text>}
                </Column>
            </Form>
        </Container>
    );
}

export default Auth;