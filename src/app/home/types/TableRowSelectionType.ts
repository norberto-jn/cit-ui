import { TableProps } from "antd";

export type TableRowSelectionType<T extends object = object> = TableProps<T>['rowSelection'];
