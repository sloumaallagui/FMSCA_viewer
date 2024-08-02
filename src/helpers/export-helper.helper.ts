import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

class ExportHelper {
  static exportToCSV(filteredData: any, visibleColumns: any, allColumns: any) {
    const filteredDataForExport = filteredData.map((row : any) => {
      const exportRow: any = {};
      visibleColumns.forEach((columnId: any) => {
        exportRow[allColumns.find((col: any) => col.id === columnId)?.label || columnId] = row[columnId];
      });
      return exportRow;
    });

    const header = Object.keys(filteredDataForExport[0] || {}).join(',');
    const csvRows = filteredDataForExport.map((row: any) => Object.values(row).join(','));

    const csvContent = `data:text/csv;charset=utf-8,${header}\n${csvRows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  }

  static exportToXLSX(filteredData: any, visibleColumns: any, allColumns: any) {
    const filteredDataForExport = filteredData.map((row: any) => {
      const exportRow: any = {};
      visibleColumns.forEach((columnId: any) => {
        exportRow[allColumns.find((col: any) => col.id === columnId)?.label || columnId] = row[columnId];
      });
      return exportRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredDataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'export.xlsx');
  }
}

export default ExportHelper;
