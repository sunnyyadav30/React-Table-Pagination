import { HTMLAttributes, useMemo, useState } from "react";

interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
	onRowChange?: (rows: number) => void;
	onPageChange?: (page: number) => void;
	totalRows?: number;
	rowsPerPage?: number;
	page?: number;
	rowPerPageOptions?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
	totalRows,
	rowsPerPage,
	page,
	onPageChange,
	onRowChange,
	rowPerPageOptions,
	...props
}) => {
	const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

	const totalPages = useMemo(() => {
		return Math.ceil((totalRows || 0) / (rowsPerPage || 0));
	}, [totalRows, rowsPerPage]);

	const handleRowChange = (rowsPerPage: number) => {
		onRowChange?.(rowsPerPage);
		setToggleDropdown((prev) => !prev);
	};

	const startPage = (rowsPerPage || 0) * (page || 0) + 1;

	const endPage = (rowsPerPage || 0) * (page || 0) + (rowsPerPage || 0);

	return (
		<div {...props} className="pagination">
			<div className="dropdown">
				<div>
					Showing{" "}
					<span className="current-page">
						{startPage} - {endPage} of {totalRows}
					</span>
				</div>
				<div className="label">Rows Per Page</div>
				<div className="selected-values" onClick={() => setToggleDropdown((prev) => !prev)}>
					{rowsPerPage}
				</div>
				{toggleDropdown && (
					<ul>
						{rowPerPageOptions?.map((rows) => (
							<li onClick={() => handleRowChange(rows)} key={rows}>
								{rows}
							</li>
						))}
					</ul>
				)}
			</div>
			<div className="page-nav">
				<button disabled={page === 0} onClick={() => onPageChange?.((page || 0) - 1)}>
					Previous
				</button>
				<button
					disabled={page === totalPages - 1}
					onClick={() => onPageChange?.((page || 0) + 1)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Pagination;
