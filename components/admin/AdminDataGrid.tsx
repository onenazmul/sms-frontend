"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column = {
  key: string;
  title: string;
  render?: (row: any) => React.ReactNode;
};

type Props = {
  columns: Column[];
  rows: any[];
  loading?: boolean;
  page: number;
  lastPage: number;
  onPageChange: (p: number) => void;
};

export default function AdminDataGrid({
  columns,
  rows,
  loading,
  page,
  lastPage,
  onPageChange,
}: Props) {
  return (
    <div className="space-y-3">

      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key}>{c.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((c) => (
                  <TableCell key={c.key}>
                    {c.render ? c.render(row) : row[c.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Button>

        <span className="px-3 py-2 text-sm">
          {page} / {lastPage}
        </span>

        <Button
          disabled={page === lastPage}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>

    </div>
  );
}
