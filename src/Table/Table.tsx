import React, { HTMLAttributes } from "react";

interface TableProps extends HTMLAttributes<HTMLTableElement> {
	children?: React.ReactNode;
}
const Table: React.FC<TableProps> = ({ children, ...props }) => {
	return <table {...props}>{children}</table>;
};

export default Table;
