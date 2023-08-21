import dynamic from 'next/dynamic';
import { Banner } from '@/components/Banner';

import { type CharacterResponse } from '@/lib/types';
import { getData } from '@/lib/utils';
import { columns } from './columns';
const DataTable = dynamic(async () => await import('@/components/DataTable'), {
  ssr: false,
  loading: () => (
    <section className="grid place-items-center h-[220px]">
      <p>Loading...</p>
    </section>
  ),
});
export default async function Page() {
  const data = await getData<CharacterResponse>(
    `${process.env.API_URL as string}character`,
  );
  const characters = data?.results;

  return (
    <>
      <Banner
        body="Here is a quick review of some of the characters that appear on Rick and Morty show."
        heading="Rick and Morty Characters!"
      />
      <section className="max-w-[1140px] mx-auto pb-16">
        <DataTable
          columns={columns as any}
          data={characters}
          fieldsToFilter={['name', 'type', 'species', 'gender']}
          dataType="character"
        />
      </section>
    </>
  );
}
