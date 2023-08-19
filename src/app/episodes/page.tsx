import { Banner } from '@/components/Banner';
import { DataTable } from '@/components/DataTable';
import { type EpisodeResponse } from '@/lib/types';
import { getData } from '@/lib/utils';
import { columns } from './columns';

export default async function Page() {
  const data = await getData<EpisodeResponse>(
    `${process.env.API_URL as string}episode`,
  );
  const episodes = data?.results;

  return (
    <>
      <Banner
        body="Episodes that aired on Rick and Morty show."
        heading="Rick and Morty Episodes!"
      />
      <section className="max-w-[1140px] mx-auto pb-16">
        <DataTable columns={columns} data={episodes} />
      </section>
    </>
  );
}
