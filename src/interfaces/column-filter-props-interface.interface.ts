export default interface ColumnFilterPropsInterface {
    allColumns: { id: string; label: string }[];
    visibleColumns: string[];
    onColumnVisibilityChange: (columnId: string) => void;
  }