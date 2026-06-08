export type CsvColumn<T> = {
  header: string;
  value: (row: T) => string | number | null | undefined;
};

const escapeCell = (value: string | number | null | undefined) => {
  const stringValue = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};

export const exportToCsv = <T>(
  filename: string,
  columns: CsvColumn<T>[],
  rows: T[]
) => {
  const header = columns.map((column) => escapeCell(column.header)).join(",");
  const body = rows
    .map((row) => columns.map((column) => escapeCell(column.value(row))).join(","))
    .join("\n");
  const csv = `${header}\n${body}`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
