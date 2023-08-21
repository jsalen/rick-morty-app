'use client';

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { useState } from 'react';

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
import { useMatchMedia } from '@/hooks/useMatchMedia';
import { breakpoints } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { CharacterForm } from './CharacterForm';
import { buttonVariants } from '../ui/button';

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
  const isDesktop = useMatchMedia(breakpoints.desktop);

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
      <div className={`flex gap-4 mb-3 ${(isDesktop && '') || 'justify-end'}`}>
        {isDesktop ? (
          fieldsToFilter?.map((field) => (
            <Input
              key={field}
              placeholder={`Filter by ${field}...`}
              value={(table.getColumn(field)?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn(field)?.setFilterValue(event.target.value)
              }
            />
          ))
        ) : (
          <Sheet>
            <SheetTrigger className={buttonVariants({ variant: 'secondary' })}>
              Filters
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-3xl min-w-max text-left mb-4">
                  Filters
                </SheetTitle>
              </SheetHeader>
              {fieldsToFilter?.map((field) => (
                <Input
                  key={field}
                  className="mb-4"
                  placeholder={`Filter by ${field}...`}
                  value={
                    (table.getColumn(field)?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table.getColumn(field)?.setFilterValue(event.target.value)
                  }
                />
              ))}
            </SheetContent>
          </Sheet>
        )}
        {dataType === 'character' && (
          <CharacterForm
            formAction="create"
            triggerHeading="Create Character"
          />
        )}
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
