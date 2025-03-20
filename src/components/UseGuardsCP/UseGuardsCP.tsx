import { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CenterCP from '/src/components/CenterCP/CenterCP';
import SpinnerCP from '/src/components/SpinnerCP/SpinnerCP';

type WithAuthProps = {};

const UseGuardsCP = <P extends WithAuthProps>(WrappedComponent: NextPage<P>) => {
    const Wrapper: NextPage<P> = (props) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                try {

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-auth`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok)
                        setIsAuthenticated(true);
                    else
                        router.push('/auth/login');

                } catch (error) {
                    console.error('Erro ao verificar autenticação:', error);
                    router.push('/auth/login');
                } finally {
                    setIsLoading(false);
                }
            };

            checkAuth();
        }, [router]);

        if (isLoading) {
            return (
                <CenterCP>
                    <SpinnerCP />
                </CenterCP>
            );
        }

        if (!isAuthenticated)
            return null

        return <WrappedComponent {...props} />
    };

    return Wrapper;
};

export default UseGuardsCP;