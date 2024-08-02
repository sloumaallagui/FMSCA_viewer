// DataTable.tsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, TextField, FormControl, InputLabel, FormGroup, FormControlLabel, Checkbox, Button, Box } from '@mui/material';
import DataTablePropsInterface from '../interfaces/data-table-props-interface.interfaces';
import { saveAs } from 'file-saver'; // For CSV export
import * as XLSX from 'xlsx'; // For XLSX export
import ColumnFilterComponent from './column-filter-component.component';
import DownloadIcon from '@mui/icons-material/Download';
import { ALL_COLUMNS } from '../constants/all-columns-constant.constant';
import { DEFAULT_COLUMNS } from '../constants/default-columns-constant.contsant';
import ExportHelper from '../helpers/export-helper.helper';

const allColumns = [...ALL_COLUMNS];
const defaultColumns = [...DEFAULT_COLUMNS];

const DataTableComponent: React.FC<DataTablePropsInterface> = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(defaultColumns);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleColumnVisibilityChange = (columnId: string) => {
        setVisibleColumns((prev) =>
            prev.includes(columnId) ? prev.filter(id => id !== columnId) : [...prev, columnId]
        );
    };

    const filteredData = data.filter(row => {
        return visibleColumns.some(columnId => {
            const value = row[columnId]?.toString().toLowerCase() || '';
            return value.includes(search.toLowerCase());
        });
    });

    const paginatedRows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper style={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, flexWrap: 'wrap' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={search}
                    onChange={handleSearchChange}
                />

            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
                <ColumnFilterComponent
                    allColumns={allColumns}
                    visibleColumns={visibleColumns}
                    onColumnVisibilityChange={handleColumnVisibilityChange}
                />
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', marginTop: '5px' }} >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => ExportHelper.exportToCSV(filteredData, visibleColumns, allColumns)}
                    >
                       <DownloadIcon /> Export CSV
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => ExportHelper.exportToXLSX(filteredData, visibleColumns, allColumns)}
                    >        
                       <DownloadIcon />  Export XLSX
                    </Button>
                </Box>
            </Box>
            <TableContainer>
                <Table>
                    {paginatedRows.length == 0 && 
                        <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {" No data found with this settings"}
                        </Box>}
                    {paginatedRows.length > 0 && 
                        <TableHead sx={{ backgroundColor: "#1565C0", color: 'white' }}>
                            <TableRow >
                                {allColumns.filter(col => visibleColumns.includes(col.id)).map(({ id, label }) => (
                                    <TableCell sx={{ color: 'white' }} key={id}>{label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>}
                    <TableBody>
                        {paginatedRows.map((row) => (
                            <TableRow key={row.id} sx={{ cursor: "pointer", ":hover":{backgroundColor:'#e5e3e3'} }}>
                                {allColumns.filter(col => visibleColumns.includes(col.id)).map(({ id }) => (
                                    <TableCell key={id}>
                                        {row[id] ?? ''}
                                    </TableCell>
                                ))
                                }
                            </TableRow>
                        ))}

                    </TableBody>

                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25, 50]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );
};

export default DataTableComponent;
