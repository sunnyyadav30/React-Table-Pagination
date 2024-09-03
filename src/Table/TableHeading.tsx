import { HTMLAttributes } from "react";

interface TableHeadingProps extends HTMLAttributes<HTMLTableCellElement> {
	children?: React.ReactNode;
}

const TableHeading: React.FC<TableHeadingProps> = ({ children, ...props }) => {
	return <th {...props}>{children}</th>;
};

export default TableHeading;
