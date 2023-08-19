'use client';

import { type ColumnDef } from '@tanstack/react-table';

export interface EpisodeHeader {
  name: string;
  air_date: string;
  episode: string;
}

export const columns: Array<ColumnDef<EpisodeHeader>> = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'air_date',
    header: 'Air Date',
  },
  {
    accessorKey: 'episode',
    header: 'Episode',
  },
];
