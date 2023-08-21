import { Banner } from '@/components/Banner';
import { type EpisodeResponse } from '@/lib/types';
import { getData } from '@/lib/utils';
import dynamic from 'next/dynamic';
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
        <DataTable
          columns={columns}
          data={episodes}
          fieldsToFilter={['name', 'episode']}
          dataType="episode"
        />
      </section>
    </>
  );
}
