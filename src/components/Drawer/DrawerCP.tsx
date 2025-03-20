import { Button, Drawer, Form } from 'antd';
import React from 'react';
import DrawerCPProps from '/src/components/Drawer/interfaces/IDrawerCPProps';

const DrawerCP: React.FC<DrawerCPProps> = ({
  title,
  visible,
  onClose,
  onSubmit,
  children,
  isEditing = false,
}) => {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={visible}
    >
      <Form onFinish={onSubmit}>
        {children}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEditing ? 'Atualizar' : 'Salvar'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DrawerCP;