import NotificationType from "/src/components/NotificationCP/types/NotificationType";
import type { NotificationArgsProps } from 'antd';

export default interface NotificationCPProps {
  message: string;
  type: NotificationType;
  placement?: NotificationArgsProps['placement'];
  description?: string;
}