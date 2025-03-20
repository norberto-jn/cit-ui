import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Image, Input } from 'antd';
import { CSSProperties, useState } from 'react';
import { NotificationCP } from '/src/components';

const LoginForm = ({ onLogin, error, isLoading }: { onLogin: (email: string, password: string) => void, error: string | null, isLoading: boolean }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onLogin(email, password);
    };

    return (
        <div style={{ display: isLoading ? 'none' : 'flex' }} className='light-background-primary formWrapper'>
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ width: '65%', height: '50%', marginTop: '8%' }}
                onFinish={handleSubmit}
            >
                <div className='avatarContainer'>
                    {/* <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} /> */}
                    <Image src="/img/planet.png" width={'5rem'} preview={false} />
                </div>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Por favor, insira seu email!' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Email" aria-label="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
                    <Input prefix={<LockOutlined />} type="password" aria-label="Digite sua senha" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Lembrar-me</Checkbox>
                        </Form.Item>
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Entrar
                    </Button>
                    <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
                        Não tem uma conta? <a href="#">Registre-se!</a>
                    </div>
                </Form.Item>
            </Form>
            {error && (
                <NotificationCP message={error} type="error" placement='topLeft' />
            )}
        </div>
    );
};

export default LoginForm;