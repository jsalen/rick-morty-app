'use client';

import { CharacterForm } from '@/components/DataTable/CharacterForm';
import { DeleteCharacter } from '@/components/DataTable/DeleteCharacter';
import { type Character, type Location } from '@/lib/types';
import { type ColumnDef } from '@tanstack/react-table';

export interface CharacterHeader {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Location;
  location: Location;
}

export const columns: Array<ColumnDef<CharacterHeader>> = [
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
    accessorKey: 'type',
    header: 'Type',
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
      const { name } = row.original.location;

      return name;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          <CharacterForm
            formAction="update"
            character={row.original as Character}
            triggerHeading="Edit"
          />
          <DeleteCharacter id={row.original.id} />
        </div>
      );
    },
  },
];
