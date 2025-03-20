import { TableColumnsType } from "antd";
import { TableRowSelection } from "antd/es/table/interface";

export default interface ITableCPProps<T extends object> {
    columns: TableColumnsType<T>;
    dataSource: T[];
    rowSelection?: TableRowSelection<T>;
    loading?: boolean;
    onReload?: () => void;
    onSelectionChange?: (selectedRowKeys: React.Key[]) => void;
}