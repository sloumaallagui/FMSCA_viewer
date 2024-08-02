import React, { useState } from 'react';
import { Popover, Box, FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

const PopoverComponent = ({ id, open, anchorEl, handleClose, columnGroups, visibleColumns, onColumnVisibilityChange, allColumns }: any) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{ padding: 2 }}>
        {columnGroups.map((group: any, index: any) => (
          <FormControl key={index} component="fieldset" sx={{ marginBottom: 2 }}>
            <FormGroup>
              {group.columns.map((columnId: any) => (
                <FormControlLabel
                  key={columnId}
                  control={
                    <Checkbox
                      checked={visibleColumns.includes(columnId)}
                      onChange={() => onColumnVisibilityChange(columnId)}
                      name={columnId}
                    />
                  }
                  label={allColumns.find((col: any) => col.id === columnId)?.label || columnId}
                />
              ))}
            </FormGroup>
          </FormControl>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
        <Button aria-describedby={id} variant="contained" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Popover>
  );
};

export default PopoverComponent;