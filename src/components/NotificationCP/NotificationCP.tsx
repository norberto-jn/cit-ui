import { notification } from 'antd';
import React from 'react';
import NotificationCPProps from '/src/components/NotificationCP/interfaces/INotificationCPProps';

const NotificationCP: React.FC<NotificationCPProps> = ({
  message,
  type,
  placement = 'topRight',
  description,
}) => {
  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    if (message) {
      api[type]({
        message,
        description,
        placement,
      });
    }
  }, [message, type, placement, description, api]);

  return <>{contextHolder}</>;
};

export default NotificationCP;