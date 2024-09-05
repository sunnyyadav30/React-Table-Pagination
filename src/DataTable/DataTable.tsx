import { HTMLAttributes, useCallback, useEffect, useMemo, useState } from "react";
import Table from "../Table/Table";
import TableBody from "../Table/TableBody";
import TableRow from "../Table/TableRow";
import TableHeading from "../Table/TableHeading";
import TableData from "../Table/TableData";
import Pagination from "./Pagination";

interface RowObject {
	[key: string]: string | number | null | undefined;
}

interface DataTableProps extends HTMLAttributes<HTMLDivElement> {
	data?: RowObject[];
	defaultRowPerPageOptions?: number[];
	defaultRowsPerPage?: number;
}

const DataTable: React.FC<DataTableProps> = ({
	data,
	defaultRowsPerPage,
	defaultRowPerPageOptions
}) => {
	const [rowsPerPage, setRowsPerPage] = useState<number>(20);
	const [rowPerPageOptions, setRowPerPageOptions] = useState<number[]>([5, 10, 15, 20]);
	const [page, setPage] = useState<number>(0);

	useEffect(() => {
		if (defaultRowsPerPage) {
			setRowsPerPage(defaultRowsPerPage);
		}
	}, [defaultRowsPerPage]);

	useEffect(() => {
		setRowPerPageOptions(defaultRowPerPageOptions || [5, 10, 15, 20]);
	}, [defaultRowPerPageOptions]);

	const columns = useMemo(() => {
		const firstObject = data?.[0];
		let cols: string[] = [];
		if (firstObject) {
			const keys = Object?.keys(firstObject);
			cols = keys;
		}
		return cols;
	}, [data]);

	const onRowsPerPageChange = (value: number) => {
		setPage(0);
		setRowsPerPage(value);
	};

	const onPageChange = (pageValue: number) => {
		setPage(pageValue);
	};

	const getRowData = (row: RowObject, cols: string[]) => {
		return (
			<>
				{cols?.map((col, index) => (
					<TableData key={index}>{row?.[col]}</TableData>
				))}
			</>
		);
	};

	const rowsOnOnePage = useMemo(() => {
		const currentItems = rowsPerPage * page;
		return data?.slice(currentItems, currentItems + rowsPerPage);
	}, [rowsPerPage, page, data]);

	const getIndex = useCallback(
		(index: number) => {
			return rowsPerPage * page + index;
		},
		[rowsPerPage, page]
	);

	return (
		<div className="flex-table">
			<div className="data-table-container">
				<div className="pagination-container">
					<Pagination
						onRowChange={onRowsPerPageChange}
						onPageChange={onPageChange}
						rowsPerPage={rowsPerPage}
						page={page}
						totalRows={data?.length}
						rowPerPageOptions={rowPerPageOptions}
					/>
				</div>
				<div className="table-container">
					<Table>
						<TableBody>
							<TableRow>
								<TableHeading>index</TableHeading>
								{columns?.map((col, index) => (
									<TableHeading key={index}>{col}</TableHeading>
								))}
							</TableRow>
							{rowsOnOnePage?.map((row, index) => (
								<TableRow key={index}>
									<TableData key={index}>{getIndex(index + 1)}</TableData>
									{getRowData(row, columns)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default DataTable;
