'use client';

import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CreateCharacter } from './CreateCharacter';

interface IDataTable<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  fieldsToFilter?: string[];
  dataType: 'character' | 'episode';
}

const DataTable = <TData, TValue>({
  columns,
  data,
  fieldsToFilter,
  dataType,
}: IDataTable<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { storedValue } = useLocalStorage<TData>(dataType, data);

  const table = useReactTable({
    data: storedValue,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex gap-4 mb-3">
        {fieldsToFilter?.map((field) => (
          <Input
            key={field}
            placeholder={`Filter by ${field}...`}
            value={(table.getColumn(field)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(field)?.setFilterValue(event.target.value)
            }
          />
        ))}
        {dataType === 'character' && <CreateCharacter />}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-6xl"
              >
                No Results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
