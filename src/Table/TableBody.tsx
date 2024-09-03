import { HTMLAttributes } from "react";

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
	children?: React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children, ...props }) => {
	return <tbody {...props}>{children}</tbody>;
};

export default TableBody;
