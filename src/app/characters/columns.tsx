'use client';

import { type Location } from '@/lib/types';
import { type ColumnDef } from '@tanstack/react-table';

export interface Character {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Location;
  location: Location;
}

export const columns: Array<ColumnDef<Character>> = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'species',
    header: 'Species',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'origin',
    header: 'Origin',
    cell: ({ row }) => {
      const { name } = row.original.origin;

      return name;
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => {
      const { name } = row.original.origin;

      return name;
    },
  },
];
