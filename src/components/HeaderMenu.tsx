import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, MenuProps } from 'antd';
import { HttpClientUtils } from '../utils/HttpClientUtils';
import { LogOut, Moon, SunMoon, User } from 'lucide-react';
import { useTheme } from '/src/app/layout';

const HeaderMenu = () => {

    const { themePage, toggleTheme } = useTheme();

    const handleLogout = async () => {
        try {
            await HttpClientUtils.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                {},
                undefined,
                true
            );

            window.location.href = '/auth/login';

        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Perfil',
            icon: <User />,
        },
        {
            key: '2',
            label: 'Logout',
            icon: <LogOut />,
            onClick: handleLogout,
        },
    ];

    return (
        <>
            <Avatar onClick={toggleTheme}>
                {themePage === 'light' ? <Moon color='#fff' style={{ verticalAlign: 'middle' }} /> : <SunMoon color='#fff' style={{ verticalAlign: 'middle' }} />}
            </Avatar>
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar >
                        <User style={{ verticalAlign: 'middle' }} />
                    </Avatar>
                </Button>
            </Dropdown>
        </>
    );
};

export default HeaderMenu;