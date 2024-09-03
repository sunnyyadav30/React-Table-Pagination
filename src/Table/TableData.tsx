import { HTMLAttributes } from "react";

interface TableDataProps extends HTMLAttributes<HTMLTableCellElement> {
	children?: React.ReactNode;
}

const TableData: React.FC<TableDataProps> = ({ children, ...props }) => {
	return <td {...props}>{children}</td>;
};

export default TableData;
