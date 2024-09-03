import { HTMLAttributes } from "react";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
	children?: React.ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children, ...props }) => {
	return <tr {...props}>{children}</tr>;
};

export default TableRow;
