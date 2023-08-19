import { Banner } from '@/components/Banner';
import { DataTable } from '@/components/DataTable';
import { type CharacterResponse } from '@/lib/types';
import { getData } from '@/lib/utils';
import { columns } from './columns';

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
        <DataTable columns={columns} data={characters} />
      </section>
    </>
  );
}
