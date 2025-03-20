'use client';

import { Layout, TableColumnsType, theme } from 'antd';
import { useEffect, useState } from 'react';
import IDataType from '/src/app/home/interfaces/IDataType';
import { TableCP } from '/src/components';
import HeaderMenu from '/src/components/HeaderMenu';
import { HttpClientUtils } from '/src/utils/HttpClientUtils';
import { CommonResponseDTO } from '/src/common/dtos/CommonResponseDTO';
import UseGuardsCP from '/src/components/UseGuardsCP/UseGuardsCP';

const { Header, Content } = Layout;

const columns: TableColumnsType<IDataType> = [
    { title: 'ID', dataIndex: 'code' },
    { title: 'Nome', dataIndex: 'name' },
    { title: 'Descrição', dataIndex: 'description' },
    { title: 'Latitude', dataIndex: 'latitude' },
    { title: 'Longitude', dataIndex: 'longitude' },
    { title: 'Altitude', dataIndex: 'altitude' },
];

const Home = () => {
    const [dataSource, setDataSource] = useState<IDataType[]>([]);
    const [loading, setLoading] = useState(true);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const getExcavation = async () => {
        try {

            const response: CommonResponseDTO<IDataType[]> = await HttpClientUtils.findAll<CommonResponseDTO<IDataType[]>>(
                `${process.env.NEXT_PUBLIC_API_URL}/excavation`,
                undefined,
                true
            );

            const formattedData = response.data.map((item: IDataType) => ({
                key: item.code,
                code: item.code,
                name: item.name,
                description: item.description,
                latitude: item.latitude,
                longitude: item.longitude,
                altitude: item.altitude,
                createdByUserCode: item.createdByUserCode
            }));

            setDataSource(formattedData);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getExcavation();
    }, []);

    const handleReload = () => {
        setLoading(true);
        getExcavation();
    };

    const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
        console.log('Selected row keys:', selectedRowKeys);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 24px', backgroundColor: colorBgContainer }} className='headerMenu'>
                <HeaderMenu />
            </Header>
            <Content style={{ padding: '24px' }} className='light-background-primary'>
                <TableCP<IDataType>
                    columns={columns}
                    dataSource={dataSource}
                    onReload={handleReload}
                    onSelectionChange={handleSelectionChange}
                    loading={loading}
                />
            </Content>
        </Layout>
    );
};

export default UseGuardsCP(Home);