'use client'

import type { TableColumnsType } from 'antd';
import { Button, Flex, Form, Input, Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import ICreateExcavationFormValues from '/src/app/home/interfaces/ICreateExcavationFormValues';
import IExcavationModel from '/src/app/home/interfaces/IExcavationModel';
import ITableCPProps from '/src/app/home/interfaces/ITableCPProps';
import DrawerCP from '/src/components/Drawer/DrawerCP';
import NotificationCPProps from '/src/components/NotificationCP/interfaces/INotificationCPProps';
import NotificationCP from '/src/components/NotificationCP/NotificationCP';
import { HttpClientUtils } from '/src/utils/HttpClientUtils';

const TableCP = <T extends IExcavationModel>({
  columns,
  dataSource,
  rowSelection: externalRowSelection,
  loading: externalLoading,
  onReload,
  onSelectionChange,
}: ITableCPProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExcavation, setEditingExcavation] = useState<T | null>(null);
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<NotificationCPProps | null>(null);

  const openCreateDrawer = () => {
    setIsEditing(false);
    setEditingExcavation(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  const openEditDrawer = (record: T) => {
    setIsEditing(true);
    setEditingExcavation(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      latitude: record.latitude,
      longitude: record.longitude,
      altitude: record.altitude,
    });
    setDrawerVisible(true);
  };

  const handleSubmit = async (values: ICreateExcavationFormValues) => {
    setNotification(null);
    try {
      const requestData = {
        name: values.name,
        description: values.description,
        latitude: values.latitude,
        longitude: values.longitude,
        altitude: values.altitude,
      };

      if (isEditing && editingExcavation) {
        await HttpClientUtils.put(
          `${process.env.NEXT_PUBLIC_API_URL}/excavation/${editingExcavation.code}`,
          requestData,
          undefined,
          true
        );
        setNotification({ message: 'Escavação atualizada com sucesso!', type: 'success' });
      } else {
        await HttpClientUtils.post(
          `${process.env.NEXT_PUBLIC_API_URL}/excavation`,
          requestData,
          undefined,
          true
        );
        setNotification({ message: 'Escavação criada com sucesso!', type: 'success' });
      }

      setDrawerVisible(false);
      form.resetFields();
      if (onReload) onReload();
    } catch (error) {
      setNotification({ message: 'Erro ao salvar escavação.', type: 'error' });
      console.error(error);
    }
  };

  const handleDelete = async (record: T) => {
    setNotification(null);
    try {
      setInternalLoading(true);
      await HttpClientUtils.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/excavation/${record.code}`,
        undefined,
        true
      );
      setNotification({ message: 'Escavação deletada com sucesso!', type: 'success' });
      if (onReload) onReload();
    } catch (error) {
      setNotification({ message: 'Erro ao deletar escavação.', type: 'error' });
      console.error(error);
    } finally {
      setInternalLoading(false);
    }
  };

  const columnsWithActions: TableColumnsType<T> = [
    ...columns,
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Flex gap="small">
          <Button type="link" onClick={() => openEditDrawer(record)}>
            Editar
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            Deletar
          </Button>
        </Flex>
      ),
    },
  ];

  const hasSelected = selectedRowKeys.length > 0;
  const loading = externalLoading || internalLoading;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={openCreateDrawer} loading={loading}>
          Catalogar escavações
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>

      <Table<T>
        columns={columnsWithActions}
        dataSource={dataSource}
        loading={loading}
      />

      <DrawerCP
        title={isEditing ? 'Editar Escavação' : 'Criar Nova Escavação'}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      >

        <Form.Item
          name="name"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Ex: Amazona" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Ex: Perto do pantanal" />
        </Form.Item>
        <Form.Item
          name="latitude"
          label="Latitude"
          rules={[{ required: true, message: 'Por favor, insira a latitude!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Ex: 3.4653" />
        </Form.Item>
        <Form.Item
          name="longitude"
          label="Longitude"
          rules={[{ required: true, message: 'Por favor, insira a longitude!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Ex: -62.0697" />
        </Form.Item>
        <Form.Item
          name="altitude"
          label="Altitude"
          rules={[{ required: true, message: 'Por favor, insira a altitude!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Ex: 120" />
        </Form.Item>
      </DrawerCP>

      {notification && (
        <NotificationCP
          message={notification.message}
          type={notification.type}
          placement="topRight"
        />
      )}
    </Flex>
  );
};

export default TableCP;