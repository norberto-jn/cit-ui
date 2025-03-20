export default interface DrawerCPProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  children: React.ReactNode;
  isEditing?: boolean;
}