'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import LoginForm from '/src/app/auth/login/components/LoginFormCP/LoginFormCP';
import '/src/app/auth/login/css/login-style.css';
import { AuthRequestDTO } from '/src/app/auth/login/dtos/AuthRequestDTO';
import { ImageLinearGradientCP } from '/src/components';
import SpinnerCP from '/src/components/SpinnerCP/SpinnerCP';
import '/src/styles/index.css';
import { FormUtils } from '/src/utils/FormUtils';
import { HttpClientUtils } from '/src/utils/HttpClientUtils';
import md5 from 'md5'

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);
        try {
            await FormUtils.validateForm(AuthRequestDTO, { username: email, password });

            await HttpClientUtils.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    username: email,
                    password: md5(password)
                },
                undefined,
                true
            )

            router.push('/home')
            
        } catch (err) {
            setError('Credenciais inválidas');
        } finally {
            await setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        }
    };

    return { handleLogin, error, isLoading };
};

const Login = () => {
    const { handleLogin, error, isLoading } = useLogin();

    return (
        <main className="container light-background-primaryy">

            <div className="formSection light-background-primary">
                <LoginForm onLogin={handleLogin} error={error} isLoading={isLoading} />
                <div className="loadingSpinner" style={{ display: isLoading ? 'flex' : 'none' }}>
                    <SpinnerCP />
                </div>
            </div>

            <ImageLinearGradientCP
                className={'imageLinearGradient'}
                backgroundSize={'cover'}
                img='/img/maps_01.jpg'
                primaryRgba={{
                    red: 57,
                    green: 77,
                    blue: 50,
                    opacity: 0.35
                }}
                secondaryRgba={{
                    red: 0,
                    green: 0,
                    blue: 0,
                    opacity: 0.3
                }}
            />

            <div className="separatorLine"></div>

        </main>
    );
};

export default Login;