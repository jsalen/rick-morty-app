import { Banner } from '@/components/Banner';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home(): JSX.Element {
  return (
    <>
      <Banner
        heading="Welcome to your Rick and Morty Database!"
        body='We will load the data from "The Rick and Morty API" and then you can update it however you wish'
      />
      <div className="w-full flex gap-4 justify-center">
        <Link className={`${buttonVariants()}`} href="/characters">
          Characters
        </Link>
        <Link className={buttonVariants()} href="/episodes">
          Episodes
        </Link>
      </div>
    </>
  );
}
