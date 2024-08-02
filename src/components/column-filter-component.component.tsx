import React, { useState } from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Box, Button, Popover } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { COLUMN_GROUPS } from '../constants/column-groups.constant';
import PopoverComponent from './pophover-component.component';
interface ColumnFilterProps {
    allColumns: { id: string, label: string }[];
    visibleColumns: string[];
    onColumnVisibilityChange: (columnId: string) => void;
}

const columnGroups = [
    ...COLUMN_GROUPS
];

const ColumnFilter: React.FC<ColumnFilterProps> = ({ allColumns, visibleColumns, onColumnVisibilityChange }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Button aria-describedby={id} variant="contained" sx={{ backgroundColor: '#1a64b2' }} onClick={handleClick} className='sm:w-100' >
                <FilterListIcon />  Filter Columns
            </Button>
            <PopoverComponent
                id={id}
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                columnGroups={columnGroups}
                visibleColumns={visibleColumns}
                onColumnVisibilityChange={onColumnVisibilityChange}
                allColumns={allColumns}
            />
        </>
    );
};

export default ColumnFilter;
